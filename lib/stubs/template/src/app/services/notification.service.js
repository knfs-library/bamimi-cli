const sendMailStartDemo = require("../emails/startDemo.email");

module.exports = {
    startDemo: async function () {
        const mailData = {
            email: user.email,
        };
        sendMailStartDemo(mailData);
    }
};