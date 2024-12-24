module.exports = [
    {
        name: "demo",
        func: require("../app/jobs/demo.job"),
        onMain: true
    },
    {
        name: "sendMail",
        func: require("../app/jobs/sendMail.job"),
        onMain: false
    }
];