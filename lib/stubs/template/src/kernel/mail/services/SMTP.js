"use strict";

const nodemailer = require('nodemailer');
const { services } = require("@iConfigs/mail-server");
const config = services.smtp;

/**
 * Send By SMTP
 * 
 * @param {Array<String>} to 
 * @param {String} subject 
 * @param {String} html 
 */
module.exports = async (to, subject, html) => {
	try {
		switch (config.secure) {
			case "tls":
				config.tls = {
					rejectUnauthorized: false
				};
				break;
		}
	
		let transporter = nodemailer.createTransport(config);
		const response = await transporter.sendMail({
			from: config.auth.user,
			to,
			subject,
			html,
		});

		console.log('Email sent:', response);
	} catch (error) {
		return console.log('Error sending SMTP email:', error);
	}
}