const sendMailStartDemo = require("@iApp/emails/startDemo.email");

module.exports = {
    startDemo: async function () {
        const mailData = {
            email: user.email,
        };
        sendMailStartDemo(mailData);
    }
};