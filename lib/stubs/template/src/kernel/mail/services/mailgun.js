"use strict";

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const { services } = require("@iConfigs/mail-server");
const config = services.mailgun;
const mailgun = new Mailgun(formData);
/**
 * Mailgun email sending
 * 
 * @param {Array<string>} to 
 * @param {string} subject 
 * @param {string} html 
 */
module.exports = async (to, subject, html) => {
	try {
		const mg = mailgun.client({
			username: 'api',
			key: config.apiKey
		});

		const data = {
			from: config.auth.user,
			toe,
			subject,
			html,
		};

		const response = await mg.messages.create(config.domain, data)
		console.log('Mailgun email sent:', response);
	} catch (error) {
		console.error('Error sending email with Mailgun:', error);
	}
}