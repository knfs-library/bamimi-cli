
"use strict";

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { services } = require("@iConfigs/mail-server");
const config = services.ses;
/**
 * Amazon SES email sending
 * 
 * @param {Array<String>} to 
 * @param {String} subject 
 * @param {String} html 
 */
module.exports = async (to, subject, html) => {
	try {
		const ses = new SESClient({
			region: config.region, // Follow Your Region AWS
			credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey
			},
		});


		const params = {
			Source: config.auth.user,
			Destination: {
				ToAddresses: [to]
			},
			Message: {
				Subject: { Data: subject },
				Body: { Html: { Data: html } }
			}
		};

		const response = await ses.send(new SendEmailCommand(params))
		console.log("Sending SES email:", response);
	} catch (error) {
		console.error("Error sending SES email:", error);
	}
}