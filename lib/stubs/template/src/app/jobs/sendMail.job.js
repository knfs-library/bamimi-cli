const { sendMail } = require("../../utils/mail");

module.exports = {
    name: "sendMail",
    queue: "emailQueue",
    handle: async function (job) {
        await sendMail(job.data);
        console.log(`Email sent to ${job.data.to}`);
    }
};