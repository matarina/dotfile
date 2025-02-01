return {
  "nvim-lualine/lualine.nvim",

  dependencies = {
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
			-- stylua: ignore
	local colors = {
	  bg       = '#151515',
	  fg       = '#bbc2cf',
	  yellow   = '#ECBE7B',
	  cyan     = '#008080',
	  darkblue = '#081633',
	  green    = '#98be65',
	  orange   = '#FF8800',
	  violet   = '#a9a1e1',
	  magenta  = '#c678dd',
	  blue     = '#51afef',
	  red      = '#ec5f67',
	}
	local conditions = {
	  buffer_not_empty = function()
	    return vim.fn.empty(vim.fn.expand('%:t')) ~= 1
	  end,
	  hide_in_width = function()
	    return vim.fn.winwidth(0) > 80
	  end,
	  check_git_workspace = function()
	    local filepath = vim.fn.expand('%:p:h')
	    local gitdir = vim.fn.finddir('.git', filepath .. ';')
	    return gitdir and #gitdir > 0 and #gitdir < #filepath
	  end,
	}

	-- Config
	local config = {
	  options = {
	    -- Disable sections and component separators
	    component_separators = '',
	    section_separators = '',
	    theme = {
	      -- We are going to use lualine_c an lualine_x as left and
	      -- right section. Both are highlighted by c theme .  So we
	      -- are just setting default looks o statusline
	      normal = { c = { fg = colors.fg, bg = colors.bg } },
	      inactive = { c = { fg = colors.fg, bg = colors.bg } },
	    },
	  },
	  sections = {
	    -- these are to remove the defaults
	    lualine_a = {},
	    lualine_b = {},
	    lualine_y = {},
	    lualine_z = {},
	    -- These will be filled later
	    lualine_c = {},
	    lualine_x = {},
	  },
	  inactive_sections = {
	    -- these are to remove the defaults
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



-----------------------component beblow
	ins_left {
	  -- mode component
	  function()
	    return ''
	  end,
	  color = function()
	    local mode_color = {
	      n = colors.red,
	      i = colors.green,
	      v = colors.blue,
	      [''] = colors.blue,
	      V = colors.blue,
	      c = colors.magenta,
	      no = colors.red,
	      s = colors.orange,
	      S = colors.orange,
	      [''] = colors.orange,
	      ic = colors.yellow,
	      R = colors.violet,
	      Rv = colors.violet,
	      cv = colors.red,
	      ce = colors.red,
	      r = colors.cyan,
	      rm = colors.cyan,
	      ['r?'] = colors.cyan,
	      ['!'] = colors.red,
	      t = colors.red,
	    }
	    return { fg = mode_color[vim.fn.mode()], gui = 'bold'}
	  end,
	  padding = { right = 1, left = 1},
	}
----- show filesize
	ins_left {
	  'filesize',
	  cond = conditions.buffer_not_empty,
	}
----- show filename
	ins_left {
	  'filename',
	  cond = conditions.buffer_not_empty,
	  color = { fg = colors.magenta, gui = 'bold' },
	}
----- progress percent
	ins_left { 'progress', color = { fg = colors.fg, gui = 'bold' } }
----- search match count
	ins_left { 'searchcount', color = { fg = '#FDA900', gui = 'bold' },}



----- middle section
	ins_left {
	  function()
	    return '%='
	  end,
	}



----insert right
	ins_right {
	  -- Lsp server name .
	  function()
	    local msg = 'Inactive'
	    local buf_ft = vim.api.nvim_buf_get_option(0, 'filetype')
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
	  icon = ' :',
	  color = { fg = '#FFFFFF', gui = 'bold' },
	}




	ins_right { 'datetime', style = '%a %h-%d %H:%M', color = { fg = '#3A8B83', gui = 'bold' },}
	-- Add components to right sections


	-- Now don't forget to initialize lualine
	require('lualine').setup(config)
	end,
}

