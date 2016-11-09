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
		let gitUrl = yield prompt('Git link:');
		let branch = (yield prompt('Branch:')) || 'master';
		if(!config.tpl[tplName]){
			config.tpl[tplName] = {
				url: gitUrl.replace(/[\u0000-\u0019]/g, '') ,// 过滤unicode字符串
				branch: branch
			}
		}else{
			console.log(chalk.red('Template has already existed!'));
			process.exit(0);
		}

		// 将信息写入template.json文件中
		fs.writeFile(__dirname+'/../template.json', JSON.stringify(config),'utf-8', err=>{
			if (err) {throw err}
			console.log(chalk.green('New template added!\n'))
			console.log(chalk.grey('Current templates are as following:\n'));
			console.log(config)
     	console.log('\n')
     	process.exit(0)
		})
	})
}