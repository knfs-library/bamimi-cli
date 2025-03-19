const QueueManager = require("@iKernel/queue")()
const { renderTemplate } = require("@iKernel/mail")

module.exports = (data) => {
    const html = renderTemplate("demo.ejs");

    QueueManager.getQueue("emailQueue").add("sendMail", {
        to: data.email,
        subject: "Welcome to Bamimi land",
        html: html
    });
};