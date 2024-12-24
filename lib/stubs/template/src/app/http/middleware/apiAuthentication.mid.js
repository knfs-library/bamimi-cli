"use strict";
const auth = require("@iKernel/auth")
const Logger = require("@knfs-tech/bamimi-log")
const jwt = auth.getJWT()

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(403).sendMessage({
				msg: "Token not exists!"
			})
		}
		const authorization = req.headers.authorization.split(" ");
		const typeAuth = authorization[0];

		if (!typeAuth || "Bearer" !== typeAuth) {
			return res.status(403).sendMessage({
				msg: "Auth invalid!"
			})
		}

		const token = authorization[1];
		const verifiedPayload = await jwt.verify(token).catch(error => {
			return {
				error
			}
		})

		if (!verifiedPayload) {
			return res.status(403).sendMessage({
				msg: "Token invalid!"
			})
		}

		req.session.currentUser = verifiedPayload
		next()
	} catch (error) {
		new Logger(error, "error")
		return res.status(403).sendMessage({
			msg: "Auth error!"
		})
	}
}
