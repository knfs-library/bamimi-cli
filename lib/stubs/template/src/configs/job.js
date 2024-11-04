module.exports = [
    {
        name: "demo",
        func: require("../app/jobs/demo.job"),
        onMain: false
    },
    {
        name: "sendMail",
        func: require("../app/jobs/sendMail.job"),
        onMain: false
    }
];