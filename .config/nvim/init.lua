-- General settings (consolidated)
vim.g.mapleader, vim.g.maplocalleader = " ", "\\"
--vim.env.PYTHONDONTWRITEBYTECODE = "1"
--vim.env.PYTHONPYCACHEPREFIX = vim.fn.stdpath("cache") .. "/pycache"
local opt = vim.opt
opt.number = true
opt.relativenumber = true
opt.cursorline = true
opt.ignorecase = true
opt.mouse = "a"
opt.completeopt = "menu,menuone,preview"
opt.termguicolors = true
opt.clipboard = "unnamedplus"
opt.expandtab = true
opt.tabstop = 4
opt.shiftwidth = 4
opt.guicursor = "n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50"
opt.foldlevel = 99
opt.foldlevelstart = 99
opt.foldenable = true
opt.foldcolumn = "0"
vim.o.updatetime = 300000

-- Always yank with system clipboard.
vim.keymap.set({ "n", "x" }, "y", '"+y', { noremap = true, silent = true })
vim.keymap.set("n", "Y", '"+Y', { noremap = true, silent = true })

-- SSH clipboard optimization
if os.getenv("SSH_TTY") then
  local function no_paste()
    return function()
      return vim.split(vim.fn.getreg('"'), "\n")
    end
  end
  local osc52 = require("vim.ui.clipboard.osc52")
  opt.clipboard = "unnamedplus"
  vim.g.clipboard = {
    name = "OSC 52",
    copy = {
      ["+"] = osc52.copy("+"),
      ["*"] = osc52.copy("*"),
    },
    paste = { ["+"] = no_paste(), ["*"] = no_paste() },
  }
end

-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local out = vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "--branch=stable",
    "https://github.com/folke/lazy.nvim.git",
    lazypath,
  })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo(
      { { "Failed to clone lazy.nvim:\n", "ErrorMsg" }, { out, "WarningMsg" }, { "\nPress any key to exit..." } },
      true,
      {}
    )
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Plugin setup
require("lazy").setup({
  spec = {
    {
      "matarina/pyrola.nvim",
      dependencies = { "nvim-treesitter/nvim-treesitter" },
      build = ":UpdateRemotePlugins",
      config = function()
        local pyrola = require("pyrola")
        local map = vim.keymap.set
        local map_opts = { noremap = true }

        pyrola.setup({
          kernel_map = {
            python = "py3",
            r = "ir-icc-hev",
            cpp = "xcpp14",
          },
          split_horizen = false,
          split_ratio = 0.3,
        })

        -- Key mappings
        map("n", "<Enter>", function()
          pyrola.send_statement_definition()
        end, map_opts)
        map("v", "<leader>vs", function()
          pyrola.send_visual_to_repl()
        end, map_opts)
        map("n", "<leader>is", function()
          pyrola.inspect()
        end, map_opts)

        -- Image history keybindings
        map("n", "<leader>i", function()
          pyrola.show_last_image()
        end, { noremap = true, desc = "Show last image" })
        map("n", "<leader>h", function()
          pyrola.show_previous_image()
        end, { noremap = true, desc = "Previous image" })
        map("n", "<leader>l", function()
          pyrola.show_next_image()
        end, { noremap = true, desc = "Next image" })
      end,
    },
    {
      "A7Lavinraj/fyler.nvim",
      branch = "stable",
      lazy = false,
      dependencies = { "nvim-mini/mini.icons" },
      opts = {},
      keys = {
        { "<leader>e", "<Cmd>Fyler<Cr>", desc = "Open Fyler View" },
      },
    },
    {
  "shellRaining/hlchunk.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    require("hlchunk").setup({
 chunk = {
        enable = true,
        chars = {
            right_arrow = "─",
        },
        style = {
                { fg = "#6f77a3" },
            },
    },
    indent = {
        enable = true,        chars = { "¦", },
    }
    })
  end
}, 
    {
      "EdenEast/nightfox.nvim",
      config = function()
        require("nightfox").setup({
          options = {
            transparent = false,
            terminal_colors = true,
            styles = {
              comments = "NONE",
              functions = "NONE",
              keywords = "NONE",
              strings = "NONE",
              variables = "NONE",
            },
            inverse = {
              match_paren = false,
              visual = false,
              search = false,
            },
          },
          palettes = {
            carbonfox = {
              bg1 = "#000000",
              bg0 = "#000000",
            },
          },
        })
        vim.cmd.colorscheme("carbonfox")
      end,
    },
    {
      "aserowy/tmux.nvim",
      config = function()
        require("tmux").setup()
      end,
    },
    {
      "neovim/nvim-lspconfig",
      dependencies = {
        {
          "williamboman/mason.nvim",
          config = function()
            require("mason").setup()
          end,
        },
        {
          "williamboman/mason-lspconfig.nvim",
          config = function()
            local ensure = { "pyright" }
            if vim.fn.executable("R") == 1 then
              table.insert(ensure, "r_language_server")
            end
            require("mason-lspconfig").setup({
              ensure_installed = ensure,
            })
          end,
        },
      },
      config = function()
        local servers = { "pyright" }
        if vim.fn.executable("R") == 1 then
          table.insert(servers, "r_language_server")
        end
        vim.lsp.enable(servers)
      end,
    },
    {
      "folke/flash.nvim",
      opts = {
        modes = { char = { enabled = false } },
        label = {
          format = function(opts)
            return { { opts.match.label, "FlashLabel" } }
          end,
        },
      },
      keys = {
        {
          "s",
          mode = { "n", "x", "o" },
          function()
            require("flash").jump({
              labels = "asdfghjklqwertyuiopzxcvbnm,./=",
              search = { forward = false, wrap = false, multi_window = false },
              modes = { char = { enabled = false } },
            })
          end,
        },
        {
          "f",
          mode = { "n", "x", "o" },
          function()
            require("flash").jump({
              labels = "asdfghjklqwertyuiopzxcvbnm,./=",
              search = { forward = true, wrap = false, multi_window = true },
              modes = { char = { enabled = false } },
            })
          end,
        },
        {
          "<leader>t",
          mode = { "n", "o", "x" },
          function()
            require("flash").treesitter()
          end,
        },
        {
          "<leader>r",
          mode = { "o" },
          function()
            require("flash").remote()
          end,
        },
        {
          "<leader>T",
          mode = { "o", "x" },
          function()
            require("flash").treesitter_search()
          end,
        },
      },
    },

    -- SEPARATE Treesitter Configuration
    {
      "nvim-treesitter/nvim-treesitter",
      build = ":TSUpdate",
      config = function()
        -- NOTE: The module name is now 'nvim-treesitter' (not .configs or .config)
        local ts = require("nvim-treesitter")

        ts.setup({
          -- In the new version, 'install_dir' is often required or defaults to site
          install_dir = vim.fn.stdpath("data") .. "/site",
        })

        -- NEW WAY to install parsers via Lua
        ts.install({ "r", "python", "lua", "vim", "vimdoc" })
      end,
    },
  },
  checker = { enabled = true },
})

local function set_flash_highlights()
  vim.api.nvim_set_hl(0, "FlashLabel", { fg = "#000000", bg = "#f56767", bold = true })
  vim.api.nvim_set_hl(0, "FlashMatch", { fg = "#000000", bg = "#85a8bf" })
end

set_flash_highlights()
vim.api.nvim_create_autocmd("ColorScheme", {
  pattern = "*",
  callback = set_flash_highlights,
})



