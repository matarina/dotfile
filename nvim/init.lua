--------------------
----Lazy config-----


--vim.g.python3_host_prog = '/home/ma/mm/envs/dl/bin/python3'


require("config.lazy")


-------------------
--General settings
------------------
vim.g.mapleader = " "-- set leader key
vim.g.maplocalleader = '\\'
vim.opt.number = true
vim.opt.shiftwidth = 4 
vim.opt.clipboard = 'unnamedplus'
vim.opt.cursorline = true
vim.opt.ignorecase = true 
vim.opt.mouse = "a"
vim.opt.completeopt = "menu,menuone,preview"
vim.opt.termguicolors = true 
vim.opt.expandtab = true
vim.opt.tabstop = 4
vim.opt.guicursor = "n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50"




--------------------
--Keys mapping------
--------------------
--nvim_ds_repl plugins config--
vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
  pattern = {"*.py","*.R",},
  callback = function()
	vim.keymap.set("n", '<CR>', function() 
        require('nvim_ds_repl').send_statement_definition() 
    end, {noremap = true})
	vim.keymap.set("v", '<CR>', function() 
        require('nvim_ds_repl').send_visual_to_repl() 
    end, {noremap = true})
	vim.keymap.set("n", '<leader>fa', function() 
        require('nvim_ds_repl').send_buffer_to_repl() 
    end, {noremap = true})
	vim.keymap.set("n", '<leader>e', function() 
        require('nvim_ds_repl').get_variable() 
    end, {noremap = true})
end})

--nvim tree config--
vim.keymap.set('n', '<leader>e', ':NvimTreeToggle<CR>', {noremap = true})
vim.api.nvim_set_keymap("n", "<CR>", ":lua api.node.open.edit('Open')<CR>", {noremap = true})

--nvim buffer/terminal_buffer config--
vim.api.nvim_set_keymap('n', '<leader>p', ':bprev<CR>', { noremap = true })
vim.api.nvim_set_keymap('n', '<leader>n', ':bnext<CR>', { noremap = true })
vim.api.nvim_set_keymap('n', '<leader>t', ':terminal<CR>', { noremap = true })

--noice config--
vim.keymap.set("n", "<leader>nh", function()
  require("noice").cmd("history")
end)
vim.keymap.set("n", "<leader>nd", function()
  require("noice").cmd("dismiss")
end)


vim.api.nvim_set_keymap('n', '<C-o>', '<Nop>', {noremap = true, silent = true})








--------------------
--lspconfig---------
--------------------
require'lspconfig'.pyright.setup{
  -- capabilities = capabilities,
  capabilities = require('cmp_nvim_lsp').default_capabilities(),
  handlers = {
    ["textDocument/publishDiagnostics"] = function() end,
  },
}
require'lspconfig'.r_language_server.setup{
  capabilities = capabilities,
  handlers = {
    ["textDocument/publishDiagnostics"] = function() end,
  },
}

--------------------
--Color theme------
--------------------
vim.cmd("colorscheme carbonfox")





-- Assuming the 'hello' module is correctly placed and accessible
vim.api.nvim_set_keymap('n', '<leader>pp', "<cmd>lua require('nvim_ds_repl').get_envs()<CR>", {noremap = true, silent = true})
vim.api.nvim_set_keymap('n', '<leader>pj', "<cmd>lua require('nvim_ds_repl').inspect()<CR>", {noremap = true, silent = true})

