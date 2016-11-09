'use strict'
process.env.NODE_PATH = __dirname+'/../node_modules';

// 基本配置
const program = require('commander');
program.version( require('../package').version) ;
program.usage('<command>') ;

// 命令模式
program
	.command('add')
	.description('add a new template')
	.alias('a')
	.action(()=>{
		require('../command/add')() ;
	})

program
	.command('list')
	.description('list all the template')
	.alias('l')
	.action(()=>{
		require('../command/list')() ;
	})

program
	.command('init')
	.description('generate a new project')
	.alias('l')
	.action(()=>{
		require('../command/init')() ;
	})

program
	.command('delete')
	.description('delete a template')
	.alias('d')
	.action(()=>{
		require('../command/delete')() ;
	})

// 处理参数
program.parse(process.argv)

if(!program.args.length){
  program.help()
}