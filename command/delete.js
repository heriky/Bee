'use strict'
const co = require('co');
const prompt = require('co-prompt') ;
const config = require('../template');
const chalk = require('chalk');
const fs = require('fs');

module.exports = ()=>{
	co(function* (){
		// 提示用户
		let tplName = yield prompt('Template name:');
		if(config.tpl[tplName]){
			config.tpl[tplName] = undefined;
		}else{
			console.log(chalk.red('Template does not existed!'));
			process.exit(0);
		}

		// 将信息写入template.json文件中
		fs.writeFile(__dirname+'/../template.json', JSON.stringify(config),'utf-8', err=>{
			if (err) {throw err}
			console.log(chalk.green('Template deleted!\n'))
			console.log(chalk.grey('Current templates are as following:\n'));
			console.log(config)
     	console.log('\n')
     	process.exit(0)
		})
	})
}