-- Optimized Neovim Configuration

-- SSH clipboard optimization
if os.getenv("SSH_TTY") then
  local function no_paste() return function() return vim.split(vim.fn.getreg('"'), "\n") end end
  vim.opt.clipboard = "unnamedplus"
  vim.g.clipboard = {
    name = "OSC 52",
    copy = { ["+"] = require("vim.ui.clipboard.osc52").copy("+"), ["*"] = require("vim.ui.clipboard.osc52").copy("*") },
    paste = { ["+"] = no_paste(), ["*"] = no_paste() },
  }
end

-- General settings (consolidated)
vim.g.mapleader, vim.g.maplocalleader = " ", "\\"
local opts = vim.opt
opts.number, opts.relativenumber, opts.cursorline, opts.ignorecase, opts.mouse = true, true, true, true, "a"
opts.completeopt, opts.termguicolors, opts.expandtab, opts.tabstop, opts.shiftwidth = "menu,menuone,preview", true, true, 4, 4
opts.guicursor = "n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50"
opts.foldlevel, opts.foldlevelstart, opts.foldenable, opts.foldcolumn = 99, 99, true, "0"
vim.o.updatetime = 300000

-- Autocmds
vim.api.nvim_create_autocmd("CursorHold", { pattern = "*", callback = function() vim.cmd("silent! wall") end })
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "python", "json", "lua", "javascript", "typescript" },
  callback = function() opts.foldmethod, opts.foldexpr = "expr", "nvim_treesitter#foldexpr()" end,
})
-- Auto-enable csvview on CSV files
vim.api.nvim_create_autocmd("FileType", {
  pattern = "csv",
  callback = function() vim.cmd("CsvViewEnable") end,
})

-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local out = vim.fn.system({"git", "clone", "--filter=blob:none", "--branch=stable", "https://github.com/folke/lazy.nvim.git", lazypath})
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({{"Failed to clone lazy.nvim:\n", "ErrorMsg"}, {out, "WarningMsg"}, {"\nPress any key to exit..."}}, true, {})
    vim.fn.getchar() os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Keymap functions
local keymaps = {}
keymaps.noice = function()
  local nm = vim.keymap.set
  nm("n", "<leader>nh", function() require("noice").cmd("history") end, {desc="Noice History"})
  nm("n", "<leader>nd", function() require("noice").cmd("dismiss") end, {desc="Dismiss All"})
  nm({"i","n","s"}, "<c-f>", function() if not require("noice.lsp").scroll(4) then return "<c-f>" end end, {silent=true, expr=true})
  nm({"i","n","s"}, "<c-b>", function() if not require("noice.lsp").scroll(-4) then return "<c-b>" end end, {silent=true, expr=true})
  nm("c", "<S-Enter>", function() require("noice").redirect(vim.fn.getcmdline()) end)
  for _, k in ipairs({{"snl","last"},{"snh","history"},{"sna","all"},{"sd","dismiss"}}) do
    nm("n", "<leader>"..k[1], function() require("noice").cmd(k[2]) end, {desc="Noice "..k[2]:gsub("^%l", string.upper)})
  end
end

keymaps.lsp = function(bufnr)
  local opts = {noremap=true, silent=true, buffer=bufnr}
  local nm = vim.keymap.set
  nm("n", "<leader>rn", vim.lsp.buf.rename, opts)
  nm("n", "gd", function() vim.cmd("vsplit") require("telescope.builtin").lsp_definitions() end, opts)
  nm("n", "gD", vim.lsp.buf.declaration, opts)
  nm("n", "gi", vim.lsp.buf.implementation, opts)
  nm("n", "K", vim.lsp.buf.hover, opts)
  nm("n", "<leader>ca", vim.lsp.buf.code_action, opts)
end

keymaps.repl = function()
  local repl = require("nvim_ds_repl")
  vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
    pattern = {"*.py", "*.R", "*.r"},
    callback = function()
      vim.keymap.set("n", "<CR>", repl.send_statement_definition, {desc="Send to REPL"})
      vim.keymap.set("v", "<CR>", repl.send_visual_to_repl, {desc="Send visual to REPL"})
      vim.keymap.set("n", "<leader>is", repl.inspect, {desc="Inspect REPL"})
    end,
  })
end

keymaps.telescope = function()
  vim.keymap.set("n", "<leader>ff", "<cmd>Telescope find_files<CR>", {desc="Find Files"})
  vim.keymap.set("n", "<leader>fF", "<cmd>Telescope live_grep<CR>", {desc="Live Grep"})
end

keymaps.buffers = function()
  local nm = vim.keymap.set
  nm("n", "<leader>bd", ":bdelete<CR>", {desc="Delete buffer"})
  nm("n", "<leader>j", ":bprevious<CR>", {desc="Previous buffer"})
  nm("n", "<leader>k", ":bnext<CR>", {desc="Next buffer"})
end

-- Plugin setup
require("lazy").setup({
  spec = {
    {"saghen/blink.cmp", dependencies = {"rafamadriz/friendly-snippets"}, opts = {
      keymap = {preset="default", ["<CR>"]={"accept","fallback"}, ["<Tab>"]={"select_next"}, ["<C-p>"]={"select_prev"}},
      appearance = {nerd_font_variant="mono"}, completion = {documentation={auto_show=false}},
      sources = {default={"lsp","path","buffer"}}, fuzzy = {implementation="lua"},
    }, opts_extend = {"sources.default"}},
    
    {"nvim-tree/nvim-web-devicons", config = function() require("nvim-web-devicons").setup({default=true}) end},
    
    {"stevearc/conform.nvim", config = function()
      require("conform").setup({formatters_by_ft = {lua={"stylua"}, python={"black"}, javascript={"prettier"}, json={"prettier"}, cpp={"clang-format"}, r={"styler"}}})
      vim.keymap.set({"n","v"}, "<leader>fm", function() require("conform").format({async=true, lsp_fallback=true}) end)
    end},
    
    {"akinsho/bufferline.nvim", version="*", dependencies="nvim-tree/nvim-web-devicons", config = function()
      require("bufferline").setup({options={mode="buffers", diagnostics="nvim_lsp", offsets={{filetype="NvimTree", text="File Explorer"}}}})
      keymaps.buffers()
    end},
    
    {"neovim/nvim-lspconfig", config = function()
      vim.cmd([[autocmd! ColorScheme * highlight NormalFloat guibg=#1f2335 | highlight FloatBorder guifg=white guibg=#1f2335]])
      local handlers = {["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, {border="rounded"}), ["textDocument/signatureHelp"] = vim.lsp.with(vim.lsp.handlers.signature_help, {border="rounded"})}
      local lspconfig = require("lspconfig")
      local capabilities = vim.lsp.protocol.make_client_capabilities()
      local function setup_lsp(server) lspconfig[server].setup({capabilities=capabilities, on_attach=function(client, bufnr) keymaps.lsp(bufnr) client.handlers["textDocument/publishDiagnostics"] = function() end end, handlers=handlers, flags={debounce_text_changes=150}}) end
      setup_lsp("pyright") setup_lsp("r_language_server")
    end},
    
    {"folke/flash.nvim", opts = {modes={char={enabled=false}}}, keys = {
      {"s", mode={"n","x","o"}, function() require("flash").jump({labels="asdfghjklqwertyuiopzxcvbnm,./=", search={forward=false, wrap=false, multi_window=false}, modes={char={enabled=false}}}) end},
      {"f", mode={"n","x","o"}, function() require("flash").jump({labels="asdfghjklqwertyuiopzxcvbnm,./=", search={forward=true, wrap=false, multi_window=true}, modes={char={enabled=false}}}) end},
      {"<leader>t", mode={"n","o","x"}, function() require("flash").treesitter() end},
      {"<leader>r", mode={"o"}, function() require("flash").remote() end},
      {"<leader>T", mode={"o","x"}, function() require("flash").treesitter_search() end},
    }},
    
    {"lukas-reineke/indent-blankline.nvim", main="ibl", opts={}},
    
{"nvim-lualine/lualine.nvim", 
  dependencies = {"nvim-tree/nvim-web-devicons"}, 
  config = function()
    local colors = {
      bg = "#151515", 
      fg = "#bbc2cf", 
      yellow = "#ECBE7B", 
      cyan = "#008080", 
      green = "#98be65", 
      orange = "#FF8800", 
      violet = "#a9a1e1", 
      magenta = "#c678dd", 
      blue = "#51afef", 
      red = "#ec5f67"
    }
    
    local config = {
      options = {
        component_separators = "", 
        section_separators = "", 
        theme = {
          normal = {c = {fg = colors.fg, bg = colors.bg}}, 
          inactive = {c = {fg = colors.fg, bg = colors.bg}}
        }
      }, 
      sections = {
        lualine_a = {}, 
        lualine_b = {}, 
        lualine_y = {}, 
        lualine_z = {}, 
        lualine_c = {}, 
        lualine_x = {}
      }, 
      inactive_sections = {
        lualine_a = {}, 
        lualine_b = {}, 
        lualine_y = {}, 
        lualine_z = {}, 
        lualine_c = {}, 
        lualine_x = {}
      }
    }
    
    local function ins_left(c) table.insert(config.sections.lualine_c, c) end
    local function ins_right(c) table.insert(config.sections.lualine_x, c) end
    
    -- Mode indicator
    ins_left({
      function() return "" end, 
      color = function() 
        local mc = {
          n = colors.red,
          i = colors.green,
          v = colors.blue,
          c = colors.magenta,
          s = colors.orange,
          R = colors.violet,
          r = colors.cyan,
          t = colors.red
        } 
        return {fg = mc[vim.fn.mode()] or colors.red, gui = "bold"} 
      end, 
      padding = {right = 1, left = 1}
    })
    
    -- File size
    ins_left({
      "filesize", 
      cond = function() return vim.fn.empty(vim.fn.expand("%:t")) ~= 1 end
    })
    
    -- Filename with relative path
    ins_left({
      "filename", 
      path = 1, -- 0: Just the filename, 1: Relative path, 2: Absolute path, 3: Absolute path with tilde
      cond = function() return vim.fn.empty(vim.fn.expand("%:t")) ~= 1 end, 
      color = {fg = colors.magenta, gui = "bold"}
    })
        ins_left({function() return "%=" end})
    
    
    -- Progress
    ins_left({
      "progress", 
      color = {fg = colors.fg, gui = "bold"}
    })
    
    -- Search count
    ins_left({
      "searchcount",
      maxcount = 999,
      timeout = 500,
      color = {fg = colors.yellow, gui = "bold"}
    })
    
    -- Center separator
    ins_left({function() return "%=" end})
    
    
    -- Date and time
    ins_right({
      "datetime", 
      style = "%a %h-%d %H:%M", 
      color = {fg = "#3A8B83", gui = "bold"}
    })
    
    require("lualine").setup(config)
  end
},
    
    {"EdenEast/nightfox.nvim", config = function() require("nightfox").setup({options={transparent=false, terminal_colors=true, styles={comments="NONE", functions="NONE", keywords="NONE", strings="NONE", variables="NONE"}, inverse={match_paren=false, visual=false, search=false}}, palettes={carbonfox={bg1="#000000", bg0="#000000"}}}) end},
    
    {"folke/noice.nvim", event="VeryLazy", dependencies={"MunifTanjim/nui.nvim", "rcarriga/nvim-notify", "nvim-tree/nvim-web-devicons"}, opts = {
      lsp = {override={["vim.lsp.util.convert_input_to_markdown_lines"]=true, ["vim.lsp.util.stylize_markdown"]=true, ["cmp.entry.get_documentation"]=true}, hover={border={style="rounded", padding={1,2}}}, signature={border={style="rounded", padding={1,2}}}, progress={enabled=true}},
      cmdline = {enabled=true, view="cmdline_popup", format={cmdline={pattern="^:", icon="", lang="vim"}, search_down={kind="search", pattern="^/", icon=" ", lang="regex"}, search_up={kind="search", pattern="^%?", icon=" ", lang="regex"}, filter={pattern="^:%s*!", icon="", lang="bash"}, lua={pattern={"^:%s*lua%s+", "^:%s*lua%s*=%s*", "^:%s*=%s*"}, icon="", lang="lua"}, help={pattern="^:%s*he?l?p?%s+", icon=""}}},
      messages = {enabled=true, view="notify", view_error="notify", view_warn="notify", view_history="split", view_search=false},
      notify = {enabled=true, stage="fade_in_slide_out", render="compact", timeout=3000, background_colour="#000000", icons={ERROR="", WARN="", INFO="", DEBUG="", TRACE="✎"}},
      routes = {{filter={event="msg_show", any={{find="%d+L, %d+B"}, {find="; after #%d+"}, {find="; before #%d+"}}}, view="mini"}, {filter={event="msg_show", kind="", find="written"}, opts={skip=true}}},
      presets = {bottom_search=true, command_palette=true, long_message_to_split=true, inc_rename=true, lsp_doc_border=true}
    }},
    
    {"matarina/nvim_ds_repl", dependencies={"nvim-treesitter/nvim-treesitter"}, config = function()
      require("nvim-treesitter.configs").setup({ensure_installed={"lua","json","c","rust","cpp","r","python"}, auto_install=true})
      keymaps.repl()
    end, run=":TSUpdate"},
    
    {"monkoose/neocodeium", event="VeryLazy", config = function() require("neocodeium").setup() vim.keymap.set("i", "<C-g>", require("neocodeium").accept) end},
    {"aserowy/tmux.nvim", config = function() require("tmux").setup() end},
    
    {"nvim-telescope/telescope.nvim", branch="0.1.x", dependencies={"nvim-lua/plenary.nvim", "nvim-tree/nvim-web-devicons"}, config = function()
      require("telescope").setup({defaults={layout_strategy="horizontal", layout_config={width=0.8, height=0.8, prompt_position="top"}, borderchars={"─","│","─","│","╭","╮","╯","╰"}, pickers={find_files={hidden=true, no_ignore=true}}}})
      keymaps.telescope()
    end},
    
    {"stevearc/oil.nvim", dependencies={"nvim-tree/nvim-web-devicons"}, config = function()
      require("oil").setup({
        keymaps = {["<C-h>"]="actions.parent", ["<CR>"]="actions.select", ["<C-v>"]="actions.select_vsplit", ["<C-x>"]="actions.select_split", ["-"]="actions.parent", ["~"]="actions.cd_to_home"},
        use_devicons=true, columns={"icon", "size", "mtime"}, experimental_lsp_def=true,
        float={padding=2, border="rounded", override=function(opts) local w,h=vim.o.columns, vim.o.lines opts.width=math.min(80, math.floor(w*0.8)) opts.height=math.min(40, math.floor(h*0.8)) opts.col=math.floor((w-opts.width)/2) opts.row=math.floor((h-opts.height)/2) end},
        preview={border="rounded", win_options={winblend=0}}
      })
      vim.keymap.set("n", "-", "<CMD>Oil<CR>", {desc="Open Oil"})
      vim.keymap.set("n", "<leader>o", "<CMD>Oil --float<CR>", {desc="Open Oil float"})
    end},
    
    {"skardyy/neo-img", config = function() require('neo-img').setup({size="80%", center=true, auto_open=true, oil_preview=true, backend="auto", resizeMode="Fit", offset="2x3", ttyimg="local"}) end, build = function() if require('neo-img.config').config.ttyimg=="local" then vim.cmd("NeoImg Install") end end},
    {"dstein64/nvim-scrollview", config = function() require("scrollview").setup({signs_on_startup={"search", "marks"}}) end},
    {"folke/snacks.nvim", opts = {indent={enabled=true}, input={enabled=true}, notifier={enabled=true}, scope={enabled=true}, scroll={enabled=true}, statuscolumn={enabled=false}, words={enabled=true}}},
    {"norcalli/nvim-colorizer.lua", event="BufReadPre", dependencies={"EdenEast/nightfox.nvim"}, opts = {filetypes={"*"}, user_default_options={RGB=true, RRGGBB=true, names=true, RRGGBBAA=true, rgb_fn=true, hsl_fn=true, mode="background"}}, config = function(_, opts) require("colorizer").setup(opts.filetypes, opts.user_default_options) end},
    { "LunarVim/bigfile.nvim", config = function() require("bigfile").setup({
      filesize = 2, -- size in MB
      pattern = { "*" }, -- autocmd pattern
      features = { -- features to disable
        "indent_blankline",
        "illuminate",
        "lsp",
        "treesitter",
        "syntax",
        "matchparen",
        "vimopts",
        "filetype",
      },
    })
  end,
},

    
    -- Added csvview.nvim
    {"hat0uma/csvview.nvim", ft = "csv", opts = {
      parser = { comments = { "#", "//" } },
      keymaps = {
        textobject_field_inner = { "if", mode = { "o", "x" } },
        textobject_field_outer = { "af", mode = { "o", "x" } },
        jump_next_field_end = { "<Tab>", mode = { "n", "v" } },
        jump_prev_field_end = { "<S-Tab>", mode = { "n", "v" } },
        jump_next_row = { "<Enter>", mode = { "n", "v" } },
        jump_prev_row = { "<S-Enter>", mode = { "n", "v" } },
      },
    }, cmd = { "CsvViewEnable", "CsvViewDisable", "CsvViewToggle" }},
  },
  checker={enabled=true},
})

-- Final setup
vim.cmd("colorscheme carbonfox")
vim.cmd([[highlight FloatBorder guibg=#000000]])

-- R head() function
vim.keymap.set("n", "<leader>hh", function()
  if vim.bo.filetype ~= "r" then vim.notify("R files only", vim.log.levels.WARN) return end
  local word = vim.fn.expand("<cword>")
  if word == "" then vim.notify("No word under cursor", vim.log.levels.WARN) return end
  vim.api.nvim_buf_set_lines(0, vim.api.nvim_win_get_cursor(0)[1], vim.api.nvim_win_get_cursor(0)[1], false, {"head(" .. word .. ")"})
end, {desc="Insert head(word)"})



