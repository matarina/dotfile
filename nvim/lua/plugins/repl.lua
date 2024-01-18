return {
    "petrichorma/nvim_ds_repl",
    dependencies = "nvim-treesitter",
    ft = {"python", "lua"}, 
    config = function()
        require("nvim_ds_repl").setup({
            vsplit = true,
        })
    end
    }

