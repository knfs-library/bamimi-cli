module.exports = [
    {
        name: "demo",
        func: require("@iApp/jobs/demo.job"),
        onMain: false
    },
    {
        name: "sendMail",
        func: require("@iApp/jobs/sendMail.job"),
        onMain: false
    }
];