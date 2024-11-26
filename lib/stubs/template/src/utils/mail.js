"use strict";
const ejs = require('ejs');
const fs = require('fs');
const { email } = require("../configs/notification")
const nodemailer = require('nodemailer');
const mailConfig = require("../configs/mail-server")
const path = require("path")

const renderTemplate = (template, data) => {
    const emailTemplatePath = path.join(email.emailTemplateFolderPath, template);
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    return ejs.render(emailTemplate, data);
}

const sendMail = (data) => {
    const { to, subject, html } = data;
    const config = {
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
    }

    if (mailConfig.auth) {
        config.auth = {
            user: mailConfig.auth.user,
            pass: mailConfig.auth.pass,
        }
    }

    switch (mailConfig.SMTPSecure) {
        case "tls":
            config.tls = {
                // ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
            break;
    }

    let transporter = nodemailer.createTransport(config);
    transporter.sendMail({
        from: mailConfig.auth.user,
        to,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            return console.log('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    })
}

module.exports = {
    renderTemplate,
    sendMail
}