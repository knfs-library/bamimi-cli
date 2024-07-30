const { getQueue } = require("../../kernel/queue");
const { renderTemplate } = require("../../utils/mail");

module.exports = (data) => {
    const html = renderTemplate("demo.ejs");

    getQueue("emailQueue").add("sendMail", {
        to: data.email,
        subject: "Welcome to Bamimi land",
        html: html
    });
};