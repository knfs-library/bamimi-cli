"use strict";

const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { services } = require('@iConfigs/mail-server');
const config = services.gmail

module.exports = async (to, subject, html) => {
	try {
		const oauth2Client = new google.auth.OAuth2(
			config.clientId,
			config.clientSecret,
			"https://developers.google.com/oauthplayground"
		);

		oauth2Client.setCredentials({
			refresh_token: config.refreshToken
		});

		const accessToken = await oauth2Client.getAccessToken();

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: config.user,
				clientId: config.clientId,
				clientSecret: config.clientSecret,
				refreshToken: services.gmail.refreshToken,
				accessToken: accessToken.token
			}
		});

		const response = await transporter.sendMail({
			from: config.user,
			to,
			subject,
			html
		})
		console.log('Gmail email sent:', response);
	} catch (error) {
		console.error('Error sending email with Gmail:', error);
	}
}
