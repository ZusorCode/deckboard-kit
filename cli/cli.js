#!/usr/bin/env node

const arg = require('arg');
const inquirer = require('inquirer');
const { buildExtension } = require('./build');
const { createProject } = require('./create');

const parseArgumentIntoOptions = rawArgs => {
	const args = arg(
		{
			'--create': Boolean,
			'--build': Boolean,
			'-c': '--create',
			'-b': '--build'
		},
		{
			argv: rawArgs.slice(2)
		}
	);
	return {
		create: args['--create'],
		build: args['--build'],
		packageName: args._[0]
	};
};

const promptForCreate = async options => {
	const questions = [];
	questions.push({
		type: 'input',
		name: 'extName',
		message: 'Extension Name	:'
	});
	questions.push({
		type: 'input',
		name: 'description',
		message: 'Description		:'
	});
	questions.push({
		type: 'input',
		name: 'author',
		message: 'Author		:'
	});

	const answers = await inquirer.prompt(questions);
	return {
		...options,
		...answers
	};
};

const cli = async args => {
	let options = parseArgumentIntoOptions(args);
	if (options.create) {
		options = await promptForCreate(options);
		createProject(options);
	} else if (options.build) await buildExtension();
};

module.exports = {
	cli
};
