return {
  "aserowy/tmux.nvim",
  config = function()
    require("tmux").setup({
      copy_sync = { enable = false, redirect_to_clipboard = true},
      navigation = { cycle_navigation = true, enable_default_keybindings = true },
      resize = { enable_default_keybindings = true, resize_step_x = 2, resize_step_y = 2},
    })
  end,
}
