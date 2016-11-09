'use strict'
const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt') ;
const config = require('../template');
const chalk = require('chalk');


module.exports = ()=>{
	co(function* (){
		// 提示用户
		let tplName = yield prompt('Template name:');
		let projectName = yield prompt('Project name:');
		if(!config.tpl[tplName]){
			console.log(chalk.red('\n × Template does not exit!'))
      process.exit()
		}
		let gitUrl = config.tpl[tplName].url;
		console.log(gitUrl)

		//组装git命令交给exec执行
		let cmd = `git clone ${gitUrl} ${projectName}&&cd ${projectName}`
		console.log(chalk.white('\n Start generating...'));

		exec(cmd,(err, stdout, stderr)=>{
			if (err) {console.log(err); process.exit(-1)};
			console.log(chalk.green('\n √ Generation completed!'));
			console.log(`\n Please execute "cd ${projectName}&&npm install"`)
			process.exit();
		})
	})
}