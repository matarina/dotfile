-------------------------------------------------
-- Optimized Neovim Configuration
-- Organized structure with grouped keymaps
-------------------------------------------------

-- Performance optimization: Only check clipboard in SSH if needed
if os.getenv("SSH_TTY") ~= nil then
	local function no_paste()
		return function()
			local content = vim.fn.getreg('"')
			return vim.split(content, "\n")
		end
	end

	vim.opt.clipboard = "unnamedplus"

	vim.g.clipboard = {
		name = "OSC 52",
		copy = {
			["+"] = require("vim.ui.clipboard.osc52").copy("+"),
			["*"] = require("vim.ui.clipboard.osc52").copy("*"),
		},
		paste = {
			["+"] = no_paste(),
			["*"] = no_paste(),
		},
	}
end

-------------------------------------------------
-- General editor settings
-------------------------------------------------
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.shiftwidth = 4
vim.opt.cursorline = true
vim.opt.ignorecase = true
vim.opt.mouse = "a"
vim.opt.completeopt = "menu,menuone,preview"
vim.opt.termguicolors = true
vim.opt.expandtab = true
vim.opt.tabstop = 4
vim.opt.guicursor = "n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50"

-- Fold configuration
vim.opt.foldlevel = 99 -- Start with all folds open
vim.opt.foldlevelstart = 99
vim.opt.foldenable = true
vim.opt.foldcolumn = "0"

vim.api.nvim_create_autocmd("FileType", {
	pattern = { "python", "json", "lua", "javascript", "typescript" },
	callback = function()
		vim.opt_local.foldmethod = "expr"
		vim.opt_local.foldexpr = "nvim_treesitter#foldexpr()"
	end,
})

-------------------------------------------------
-- Bootstrap lazy.nvim (package manager)
-------------------------------------------------
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
	if vim.v.shell_error ~= 0 then
		vim.api.nvim_echo({
			{ "Failed to clone lazy.nvim:\n", "ErrorMsg" },
			{ out, "WarningMsg" },
			{ "\nPress any key to exit..." },
		}, true, {})
		vim.fn.getchar()
		os.exit(1)
	end
end
vim.opt.rtp:prepend(lazypath)

-------------------------------------------------
-- All keymappings (centralized)
-------------------------------------------------
-- Create keymaps container to be populated as we go
local keymaps = {}

-- Noice keymaps
keymaps.noice = function()
	vim.keymap.set("n", "<leader>nh", function()
		require("noice").cmd("history")
	end, { desc = "Noice History" })
	vim.keymap.set("n", "<leader>nd", function()
		require("noice").cmd("dismiss")
	end, { desc = "Dismiss All" })

	-- Advanced noice keymaps
	vim.keymap.set({ "i", "n", "s" }, "<c-f>", function()
		if not require("noice.lsp").scroll(4) then
			return "<c-f>"
		end
	end, { silent = true, expr = true, desc = "Scroll forward" })

	vim.keymap.set({ "i", "n", "s" }, "<c-b>", function()
		if not require("noice.lsp").scroll(-4) then
			return "<c-b>"
		end
	end, { silent = true, expr = true, desc = "Scroll backward" })

	vim.keymap.set("c", "<S-Enter>", function()
		require("noice").redirect(vim.fn.getcmdline())
	end, { desc = "Redirect Cmdline" })

	vim.keymap.set("n", "<leader>snl", function()
		require("noice").cmd("last")
	end, { desc = "Noice Last Message" })

	vim.keymap.set("n", "<leader>snh", function()
		require("noice").cmd("history")
	end, { desc = "Noice History" })

	vim.keymap.set("n", "<leader>sna", function()
		require("noice").cmd("all")
	end, { desc = "Noice All" })

	vim.keymap.set("n", "<leader>sd", function()
		require("noice").cmd("dismiss")
	end, { desc = "Dismiss All" })
end

-- LSP keymaps
keymaps.lsp = function(bufnr)
	local bufopts = { noremap = true, silent = true, buffer = bufnr }
	vim.keymap.set("n", "<leader>rn", vim.lsp.buf.rename, bufopts)
	vim.keymap.set("n", "gd", function()
		vim.cmd("vsplit") -- Open a vertical split
		require("telescope.builtin").lsp_definitions() -- Use Telescope for definitions
	end, bufopts)
	vim.keymap.set("n", "gD", vim.lsp.buf.declaration, bufopts) -- Go to declaration
	vim.keymap.set("n", "gi", vim.lsp.buf.implementation, bufopts) -- Go to implementation
	vim.keymap.set("n", "K", vim.lsp.buf.hover, bufopts) -- Show hover documentation
	vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, bufopts) -- Code actions
end

-- REPL keymaps for data science work
keymaps.repl = function()
	local repl = require("nvim_ds_repl")

	vim.api.nvim_create_autocmd({ "BufEnter", "BufWinEnter" }, {
		pattern = { "*.py", "*.R", "*.r" },
		callback = function()
			-- Execute the current statement or block under the cursor
			vim.keymap.set("n", "<CR>", function()
				repl.send_statement_definition()
			end, { noremap = true, desc = "Send statement to REPL" })

			-- Execute the selected visual block of code
			vim.keymap.set("v", "<CR>", function()
				repl.send_visual_to_repl()
			end, { noremap = true, desc = "Send visual selection to REPL" })

			-- Query global environment variable information
			vim.keymap.set("n", "<leader>is", function()
				repl.inspect()
			end, { noremap = true, desc = "Inspect REPL environment" })
		end,
	})
end

-- Yazi file manager keymaps
keymaps.yazi = function()
	vim.keymap.set({ "n", "v" }, "<leader>-", "<cmd>Yazi<cr>", { desc = "Open yazi at the current file" })

	vim.keymap.set(
		"n",
		"<leader>cw",
		"<cmd>Yazi cwd<cr>",
		{ desc = "Open the file manager in nvim's working directory" }
	)

	vim.keymap.set("n", "<c-up>", "<cmd>Yazi toggle<cr>", { desc = "Resume the last yazi session" })
end

-- Telescope keymaps
keymaps.telescope = function()
	vim.keymap.set(
		"n",
		"<leader>ff",
		"<cmd>Telescope find_files<CR>",
		{ noremap = true, silent = true, desc = "Find Files (CWD)" }
	)
	vim.keymap.set(
		"n",
		"<leader>fF",
		"<cmd>Telescope find_files cwd=/data/opus/<CR>",
		{ noremap = true, silent = true, desc = "Find Files (home)" }
	)
end

-------------------------------------------------
-- Plugin configurations with lazy.nvim
-------------------------------------------------
require("lazy").setup({
	spec = {
		-- Code formatting
		{
			"stevearc/conform.nvim",
			config = function()
				require("conform").setup({
					formatters_by_ft = {
						lua = { "stylua" },
						python = { "black" },
						javascript = { "prettier" },
						json = { "prettier" },
						cpp = { "clang-format" },
						r = { "styler" },
					},
					format_on_save = {
						timeout_ms = 2000,
						lsp_fallback = true,
					},
				})
			end,
		},

		-- Buffer management
		{
			"akinsho/bufferline.nvim",
			version = "*",
			dependencies = "nvim-tree/nvim-web-devicons",
			config = function()
				require("bufferline").setup({
					options = {
						mode = "buffers",
						numbers = "none",
						close_command = "bdelete! %d",
						right_mouse_command = "bdelete! %d",
						left_mouse_command = "buffer %d",
						middle_mouse_command = nil,
						indicator = {
							icon = "▎",
							style = "icon",
						},
						buffer_close_icon = "",
						modified_icon = "●",
						close_icon = "",
						left_trunc_marker = "",
						right_trunc_marker = "",
						max_name_length = 18,
						max_prefix_length = 15,
						tab_size = 18,
						diagnostics = "nvim_lsp",
						diagnostics_update_in_insert = false,
						offsets = { { filetype = "NvimTree", text = "File Explorer", text_align = "left" } },
						show_buffer_icons = true,
						show_buffer_close_icons = true,
						show_close_icon = true,
						show_tab_indicators = true,
						persist_buffer_sort = true,
						separator_style = "thin",
						enforce_regular_tabs = false,
						always_show_bufferline = true,
					},
				})
			end,
		},

		-- Autocompletion
		{
			"hrsh7th/nvim-cmp",
			dependencies = {
				"hrsh7th/cmp-nvim-lsp",
				"hrsh7th/cmp-path",
			},
			config = function()
				local cmp = require("cmp")
				cmp.setup({
					snippet = {
						expand = function(args)
							vim.fn["vsnip#anonymous"](args.body)
						end,
					},
					mapping = cmp.mapping.preset.insert({}),
					sources = cmp.config.sources({
						{ name = "nvim_lsp" },
						{ name = "path" },
					}),
					window = {
						completion = cmp.config.window.bordered(),
						documentation = cmp.config.window.bordered(),
					},
				})
			end,
		},

		-- LSP configuration
		{
			"neovim/nvim-lspconfig",
			config = function()
				vim.cmd([[autocmd! ColorScheme * highlight NormalFloat guibg=#1f2335]])
				vim.cmd([[autocmd! ColorScheme * highlight FloatBorder guifg=white guibg=#1f2335]])

				local handlers = {
					["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, { border = "rounded" }),
					["textDocument/signatureHelp"] = vim.lsp.with(
						vim.lsp.handlers.signature_help,
						{ border = "rounded" }
					),
				}

				local lspconfig = require("lspconfig")
				local capabilities = require("cmp_nvim_lsp").default_capabilities()
				local function disable_diagnostics(client, bufnr)
					client.handlers["textDocument/publishDiagnostics"] = function() end
				end

				-- Python LSP setup
				lspconfig.pyright.setup({
					capabilities = capabilities,
					on_attach = function(client, bufnr)
						keymaps.lsp(bufnr)
						disable_diagnostics(client, bufnr)
					end,
					handlers = handlers,
					flags = {
						debounce_text_changes = 150,
					},
				})

				-- R language LSP setup
				lspconfig.r_language_server.setup({
					capabilities = capabilities,
					on_attach = function(client, bufnr)
						keymaps.lsp(bufnr)
						disable_diagnostics(client, bufnr)
					end,
					handlers = handlers,
					flags = {
						debounce_text_changes = 150,
					},
				})
			end,
		},

		-- Fast navigation with Flash
		{
			"folke/flash.nvim",
			enabled = true,
			opts = {
				modes = {
					char = {
						enabled = false,
						keys = { "f", "F", "t", "T" },
					},
				},
			},
			keys = {
				{ "s", mode = { "n", "x", "o" }, false },
				{ "S", mode = { "n", "o", "x" }, false },
				{ "r", mode = { "o" }, false },
				{ "R", mode = { "o", "x" }, false },
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
					desc = "Flash Forward",
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
					desc = "Flash Backward",
				},
				{
					"<leader>t",
					mode = { "n", "o", "x" },
					function()
						require("flash").treesitter()
					end,
					desc = "Flash Treesitter",
				},
				{
					"<leader>r",
					mode = { "o" },
					function()
						require("flash").remote()
					end,
					desc = "Remote Flash",
				},
				{
					"<leader>T",
					mode = { "o", "x" },
					function()
						require("flash").treesitter_search()
					end,
					desc = "Treesitter Search",
				},
			},
		},

		-- Visual indentation guides
		{
			"lukas-reineke/indent-blankline.nvim",
			main = "ibl",
			opts = {},
		},

		-- Status line
		{
			"nvim-lualine/lualine.nvim",
			dependencies = {
				"nvim-tree/nvim-web-devicons",
			},
			config = function()
                -- stylua: ignore
                local colors = {
                    bg = "#151515",
                    fg = "#bbc2cf",
                    yellow = "#ECBE7B",
                    cyan = "#008080",
                    darkblue = "#081633",
                    green = "#98be65",
                    orange = "#FF8800",
                    violet = "#a9a1e1",
                    magenta = "#c678dd",
                    blue = "#51afef",
                    red = "#ec5f67"
                }
				local conditions = {
					buffer_not_empty = function()
						return vim.fn.empty(vim.fn.expand("%:t")) ~= 1
					end,
					hide_in_width = function()
						return vim.fn.winwidth(0) > 80
					end,
					check_git_workspace = function()
						local filepath = vim.fn.expand("%:p:h")
						local gitdir = vim.fn.finddir(".git", filepath .. ";")
						return gitdir and #gitdir > 0 and #gitdir < #filepath
					end,
				}

				-- Config
				local config = {
					options = {
						component_separators = "",
						section_separators = "",
						theme = {
							normal = { c = { fg = colors.fg, bg = colors.bg } },
							inactive = { c = { fg = colors.fg, bg = colors.bg } },
						},
					},
					sections = {
						lualine_a = {},
						lualine_b = {},
						lualine_y = {},
						lualine_z = {},
						lualine_c = {},
						lualine_x = {},
					},
					inactive_sections = {
						lualine_a = {},
						lualine_b = {},
						lualine_y = {},
						lualine_z = {},
						lualine_c = {},
						lualine_x = {},
					},
				}

				-- Inserts a component in lualine_c at left section
				local function ins_left(component)
					table.insert(config.sections.lualine_c, component)
				end

				-- Inserts a component in lualine_x at right section
				local function ins_right(component)
					table.insert(config.sections.lualine_x, component)
				end

				-- Components
				ins_left({
					function()
						return ""
					end,
					color = function()
						local mode_color = {
							n = colors.red,
							i = colors.green,
							v = colors.blue,
							[""] = colors.blue,
							V = colors.blue,
							c = colors.magenta,
							no = colors.red,
							s = colors.orange,
							S = colors.orange,
							[""] = colors.orange,
							ic = colors.yellow,
							R = colors.violet,
							Rv = colors.violet,
							cv = colors.red,
							ce = colors.red,
							r = colors.cyan,
							rm = colors.cyan,
							["r?"] = colors.cyan,
							["!"] = colors.red,
							t = colors.red,
						}
						return { fg = mode_color[vim.fn.mode()], gui = "bold" }
					end,
					padding = { right = 1, left = 1 },
				})
				ins_left({
					"filesize",
					cond = conditions.buffer_not_empty,
				})
				ins_left({
					"filename",
					cond = conditions.buffer_not_empty,
					color = { fg = colors.magenta, gui = "bold" },
				})
				ins_left({ "progress", color = { fg = colors.fg, gui = "bold" } })
				ins_left({ "searchcount", color = { fg = "#FDA900", gui = "bold" } })

				ins_left({
					function()
						return "%="
					end,
				})

				ins_right({
					function()
						local msg = "Inactive"
						local buf_ft = vim.api.nvim_buf_get_option(0, "filetype")
						local clients = vim.lsp.get_active_clients()
						if next(clients) == nil then
							return msg
						end
						for _, client in ipairs(clients) do
							local filetypes = client.config.filetypes
							if filetypes and vim.fn.index(filetypes, buf_ft) ~= -1 then
								return client.name
							end
						end
						return msg
					end,
					icon = " :",
					color = { fg = "#FFFFFF", gui = "bold" },
				})

				ins_right({ "datetime", style = "%a %h-%d %H:%M", color = { fg = "#3A8B83", gui = "bold" } })

				-- Initialize lualine
				require("lualine").setup(config)
			end,
		},

		-- Color theme
		{
			"EdenEast/nightfox.nvim",
			config = function()
				require("nightfox").setup({
					options = {
						compile_path = vim.fn.stdpath("cache") .. "/nightfox",
						compile_file_suffix = "_compiled",
						transparent = false,
						terminal_colors = true,
						dim_inactive = false,
						module_default = true,
						colorblind = {
							enable = false,
							simulate_only = false,
							severity = {
								protan = 0,
								deutan = 0,
								tritan = 0,
							},
						},
						styles = {
							comments = "NONE",
							conditionals = "NONE",
							constants = "NONE",
							functions = "NONE",
							keywords = "NONE",
							numbers = "NONE",
							operators = "NONE",
							strings = "NONE",
							types = "NONE",
							variables = "NONE",
						},
						inverse = {
							match_paren = false,
							visual = false,
							search = false,
						},
						modules = {},
					},
					palettes = {
						carbonfox = {
							bg1 = "#000000",
							bg0 = "#000000",
						},
					},
					specs = {},
					groups = {},
				})
			end,
		},

		-- UI notifications and cmdline
		{
			"folke/noice.nvim",
			event = "VeryLazy",
			dependencies = {
				"MunifTanjim/nui.nvim",
				"rcarriga/nvim-notify",
			},
			opts = {
				lsp = {
					override = {
						["vim.lsp.util.convert_input_to_markdown_lines"] = true,
						["vim.lsp.util.stylize_markdown"] = true,
						["cmp.entry.get_documentation"] = true,
					},
				},
				routes = {
					{
						filter = {
							event = "msg_show",
							any = {
								{ find = "%d+L, %d+B" },
								{ find = "; after #%d+" },
								{ find = "; before #%d+" },
							},
						},
						view = "mini",
					},
				},
				presets = {
					bottom_search = true,
					command_palette = true,
					long_message_to_split = true,
					inc_rename = true,
				},
			},
			config = function()
				keymaps.noice()
			end,
		},

		-- REPL integration
		{
			"matarina/nvim_ds_repl",
			dependencies = { "nvim-treesitter/nvim-treesitter" },
			config = function()
				require("nvim-treesitter.configs").setup({
					ensure_installed = { "lua", "json", "c", "rust", "cpp", "r", "python" },
					auto_install = true,
				})
				keymaps.repl()
			end,
			run = ":TSUpdate",
		},

		-- GitHub Copilot
		{
			"github/copilot.vim",
		},

		-- TMUX integration
		{
			"aserowy/tmux.nvim",
			config = function()
				return require("tmux").setup()
			end,
		},

		-- Telescope.nvim
		{
			"nvim-telescope/telescope.nvim",
			branch = "0.1.x",
			dependencies = {
				"nvim-lua/plenary.nvim",
				"nvim-tree/nvim-web-devicons",
			},
			config = function()
				require("telescope").setup({
					defaults = {
						layout_strategy = "horizontal",
						layout_config = {
							width = 0.8,
							height = 0.8,
							prompt_position = "top",
						},
						borderchars = { "─", "│", "─", "│", "╭", "╮", "╯", "╰" },
						pickers = {
							find_files = {
								hidden = true,
								no_ignore = true,
							},
						},
					},
				})
				keymaps.telescope()
			end,
		},

		-- File manager integration
		{
			"mikavilpas/yazi.nvim",
			event = "VeryLazy",
			opts = {
				open_for_directories = false,
				keymaps = {
					show_help = "<f1>",
				},
			},
			config = function()
				keymaps.yazi()
			end,
		},
		-- Add this to your existing lazy.nvim spec table
		{
			"dstein64/nvim-scrollview",
			config = function()
				require("scrollview").setup({
					signs_on_startup = { "search", "marks" }, -- Enable search and mark sign groups
				})
			end,
		},

		{
			"folke/snacks.nvim",
			opts = {
				indent = { enabled = true },
				input = { enabled = true },
				notifier = { enabled = true },
				scope = { enabled = true },
				scroll = { enabled = true },
				statuscolumn = { enabled = false },
				words = { enabled = true },
			},
		},
		{
			"norcalli/nvim-colorizer.lua",
			event = "BufReadPre",
			dependencies = { "EdenEast/nightfox.nvim" }, -- Ensure nightfox loads first
			opts = {
				filetypes = { "*" },
				user_default_options = {
					RGB = true,
					RRGGBB = true,
					names = true,
					RRGGBBAA = true,
					rgb_fn = true,
					hsl_fn = true,
					css = false,
					css_fn = false,
					mode = "background",
				},
			},
			config = function(_, opts)
				require("colorizer").setup(opts.filetypes, opts.user_default_options)
			end,
		},
	},
	checker = { enabled = true },
})

-------------------------------------------------
-- Final setup and theme activation
-------------------------------------------------
vim.cmd("colorscheme carbonfox")
vim.cmd([[highlight FloatBorder guibg=#000000]])

-- Insert a new line with head(word) below the current line for R files
local function surround_with_head()
	if vim.bo.filetype == "r" then
		-- Get the word under the cursor
		local word = vim.fn.expand("<cword>")
		if word == "" then
			vim.notify("No word under cursor", vim.log.levels.WARN)
			return
		end

		-- Get the current cursor position
		local pos = vim.api.nvim_win_get_cursor(0)
		local row = pos[1]

		-- Create the new line content: head(word)
		local new_line = "head(" .. word .. ")"

		-- Insert the new line below the current line
		vim.api.nvim_buf_set_lines(0, row, row, false, { new_line })

		-- Optionally, move the cursor to the new line (uncomment if desired)
		-- vim.api.nvim_win_set_cursor(0, { row + 1, #new_line })
	else
		vim.notify("Surround with head() only works in R files", vim.log.levels.WARN)
	end
end

vim.keymap.set("n", "<leader>hh", surround_with_head, { desc = "Insert head(word) on next line (R files)" })
