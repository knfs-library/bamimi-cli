"use strict";
const mailConfig = require("@iConfigs/mail-server");

/**
 * @typedef SendMailData
 * @property {Array<string>} to
 * @property {string} subject
 * @property {string} html
 */
/**
 * Send email
 * 
 * @param {SendMailData} data 
 * @param {string} service 
 */
module.exports = async (data, options = { use: null }) => {
	const { to, subject, html } = data;

	const services = {
		"smtp": function () {
			require("./services/SMTP")(to, subject, html)
		},
		"ses": function () {
			return require("./services/ASES")(to, subject, html)
		},
		"sendgrid": function () {
			return require("./services/sendgrid")(to, subject, html)
		},
		"mailgun": function () {
			return require("./services/mailgun")(to, subject, html)
		},
		"gmail": function () {
			return require("./services/gmail")(to, subject, html)
		}
	}

	const selectedService = options.use ? services[options.use] : services[mailConfig.use]

	if (!selectedService) {
		throw new Error(`Invalid or unsupported mail service: ${options.use || mailConfig.use}`);
	}

	selectedService();
}