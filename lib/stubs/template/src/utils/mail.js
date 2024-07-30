"use strict";
const ejs = require("ejs");
const fs = require("fs");
const { email } = require("../configs/notification");
const nodemailer = require("nodemailer");
const mailConfig = require("../configs/mail-server");
const path = require("path");

const renderTemplate = (template, data) => {
    const emailTemplatePath = path.join(email.emailTemplateFolderPath, template);
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    return ejs.render(emailTemplate, data);
};

const sendMail = (data) => {
    const { to, subject, html, text } = data;
    const config = {
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
    };
    let transporter = nodemailer.createTransport(config);
    transporter.sendMail({
        from: mailConfig.auth.user,
        to: to,
        subject: subject,
        html: html,
        text: text
    }, (error, info) => {
        if (error) {
            return console.log("Error sending email:", error);
        }
        console.log("Email sent:", info.response);
    });
};

module.exports = {
    renderTemplate: renderTemplate,
    sendMail: sendMail
};