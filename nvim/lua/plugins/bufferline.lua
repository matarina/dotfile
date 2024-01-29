local M = {
  "akinsho/bufferline.nvim",
  commit = "6ecd37e0fa8b156099daedd2191130e083fb1490",
  event = { "BufReadPre", "BufAdd", "BufNew", "BufReadPost" },
  dependencies = {
    {
      "famiu/bufdelete.nvim",
      commit = "8933abc09df6c381d47dc271b1ee5d266541448e",
    },
  },
}
function M.config()
  require("bufferline").setup {
    options = {
      close_command = "Bdelete! %d",       -- can be a string | function, see "Mouse actions"
      right_mouse_command = "Bdelete! %d", -- can be a string | function, see "Mouse actions"
      offsets = { { filetype = "NvimTree", text = "", padding = 1 } },
      separator_style = "thin",            -- | "thick" | "thin" | { 'any', 'any' },
      indicator = {style = 'none' },
    },
  }
end

return M
