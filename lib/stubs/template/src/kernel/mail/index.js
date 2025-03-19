"use strict";

/**
 * @module SendMail
 */
module.exports = {
    /**
     * Render email content form template
     * @example
     * const { renderTemplate } = require("@iKernel/mail")
     * const template = "path/to/template_in_notifications_email_dir",
     * 
     * const data = {
     *   user: "user",
     *   title: "OK",
     *   content: "This is demo email"
     * }
     * 
     * const emailContent = renderTemplate(template, data)
     */
    renderTemplate: require("./template"),
    /**
     * Send Email
     * 
     * @example
     * const { sendMail } = require("@iKernel/mail")
     * const data = {
     *   to: ["user1@gmail.com"],
     *   subject: "Subject",
     *   html: "<h1> html content</h1>"
     * }
     * 
     * //Default
     * sendMail(data)
     * 
     * //stmp
     * sendMail(data, { use: "stmp"})
     * //AWS SES
     * sendMail(data, { use: "ses"})
     * // Sendgrid
     * sendMail(data, { use: "sendgrid"})
     * // mailgun
     * sendMail(data, { use: "mailgun"})
     *  // gmail
     * sendMail(data, { use: "gmail"})
     */
    sendMail: require("./service")
}