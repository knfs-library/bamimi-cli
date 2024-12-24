const { QueueManager } = require("@knfs-tech/bamimi-schedule")

module.exports = (data) => {
    const html = renderTemplate("demo.ejs");
    
    QueueManager.singleton().getQueue("emailQueue").add("sendMail", {
        to: data.email,
        subject: "Welcome to Bamimi land",
        html: html
    });
};