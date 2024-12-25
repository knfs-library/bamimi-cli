module.exports = [
    {
        name: "demo",
        func: require("@iApp/jobs/demo.job"),
        onMain: true
    },
    {
        name: "sendMail",
        func: require("@iApp/jobs/sendMail.job"),
        onMain: false
    }
];