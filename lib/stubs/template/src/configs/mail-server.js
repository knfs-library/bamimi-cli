"use strict";
require("dotenv").config();

module.exports = {
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    secure: false,
    auth: {
        user: process.env.USER_MAIL, 
        pass: process.env.PASS_MAIL
    }
};
