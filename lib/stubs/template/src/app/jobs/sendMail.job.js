const { sendMail } = require("@iKernel/mail");

module.exports = {
    name: "sendMail",
    queue: "emailQueue",
    queueManager: "bullmq",
    handle: async function (job) {
        await sendMail(job.data);
        console.log(`Email sent to ${job.data.to}`);
    }
};