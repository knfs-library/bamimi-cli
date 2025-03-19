"use strict";

const sgMail = require('@sendgrid/mail');
const { services } = require("@iConfigs/mail-server");
const config = services.sendgrid;
sgMail.setApiKey(config.apiKey);
/**
 * 
 * @param {Array<string>} to 
 * @param {string} subject 
 * @param {string} html 
 */
module.exports = async (to, subject, html) => {
	try {
		const msg = {
			to,
			from: config.user,
			subject,
			html,
		};

		const response = await sgMail.send(msg)
		console.log('SendGrid email sent:', response);
	} catch (error) {
		console.error('Error sending email with SendGrid:', error);
	}
}