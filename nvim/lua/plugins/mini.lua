return {
  'echasnovski/mini.nvim',
  version = false,
  config = function()

          require('mini.comment').setup()
          require('mini.pairs').setup()

          -- local animate = require('mini.animate')
          -- animate.setup({
          --   cursor = {
          --     timing = animate.gen_timing.linear({ duration = 200, unit = 'total' }),
          --             -- Timing of cursor animation 
          --     path = animate.gen_path.line({
          --       predicate = function() return true end,
          --     }),
          --   }
          -- })
          --

  end
}
