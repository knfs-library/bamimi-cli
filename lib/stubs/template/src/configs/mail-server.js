"use strict";
require("dotenv").config();

module.exports = {
    use: process.env.MAIL_SERVICE || "smtp", // Default mail service to use
    services: {
        /**
         * SMTP service configuration.
         * Used to send emails via an SMTP server.
         * Learn more at:
         * @link https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#sending-an-email-with-smtp
         */
        smtp: {
            host: process.env.SMTP_HOST, // SMTP server host
            port: process.env.SMTP_PORT, // SMTP server port (default 25, 465, or 587)
            secure: process.env.SMTP_SECURE || false, // Whether to use TLS/SSL (true for port 465)
            auth: {
                user: process.env.SMTP_USER, // SMTP user for authentication
                pass: process.env.SMTP_PASS, // SMTP password for authentication
            },
        },
        /**
         * Mailgun service configuration.
         * Used to send emails using the Mailgun API.
         * Learn more at:
         * @link https://documentation.mailgun.com/en/latest/quickstart-sending.html
         */
        mailgun: {
            apiKey: process.env.MAILGUN_API_KEY, // API key for Mailgun
            domain: process.env.MAILGUN_DOMAIN, // Mailgun domain for sending emails
        },
        /**
         * SendGrid service configuration.
         * Used to send emails using the SendGrid API.
         * Learn more at:
         * @link https://sendgrid.com/docs/for-developers/sending-email/
         */
        sendgrid: {
            apiKey: process.env.SENDGRID_API_KEY, // API key for SendGrid
            user: process.env.SENDGRID_USER, // SendGrid username (optional in some configurations)
        },
        /**
         * AWS SES (Simple Email Service) configuration.
         * Used to send emails using AWS SES.
         * Learn more at:
         * @link https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-set-up.html
         */
        ses: {
            region: process.env.AWS_REGION || 'us-east-1', // AWS SES region (default 'us-east-1')
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key ID for SES
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Access Key for SES
        },
        /**
         * Gmail service configuration.
         * Used to send emails via Gmail API (OAuth2).
         * Learn more at:
         * @link https://developers.google.com/gmail/api/guides/push
         */
        gmail: {
            clientId: process.env.GMAIL_CLIENT_ID, // Gmail OAuth2 Client ID
            clientSecret: process.env.GMAIL_CLIENT_SECRET, // Gmail OAuth2 Client Secret
            refreshToken: process.env.GMAIL_REFRESH_TOKEN, // Gmail OAuth2 Refresh Token
            user: process.env.GMAIL_USER, // Gmail account username to send emails from
        },
    },
};
