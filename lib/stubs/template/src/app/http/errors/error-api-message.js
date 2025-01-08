"use strict";

require("dotenv").config();

module.exports = {
	common: {
		notFound: "Not Found"
	},
	auth: {
		loginPayloadInvalid: "Login Payload Invalid",
		otpInvalid: "OTP Invalid",
		forgetPasswordInvalid: "Email Invalid",
		reVerifyInvalid: "Email Invalid",
		resetPasswordInvalid: "Reset Password Payload Invalid",
		changePasswordInvalid: "Change Payload Invalid",
		authInvalid: "Auth Invalid!",
		tokenInvalid: "Token Invalid!",
		tokenNotExist: "Token not exists!",
		roleInvalid: "Role User Invalid",
		refreshTokenInvalid: "Refresh Token Invalid"
	}
};
