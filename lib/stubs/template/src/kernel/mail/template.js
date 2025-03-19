"use strict";
const ejs = require('ejs');
const fs = require('fs');
const { email } = require("@iConfigs/notification")
const path = require("path")

/**
 * Render email content form template
 * 
 * @param {string} template - path to template from config in notification
 * @param {*} data 
 * @returns 
 */
module.exports = (template, data) => {
	const emailTemplatePath = path.join(email.emailTemplateFolderPath, template);
	const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
	return ejs.render(emailTemplate, data);
}
