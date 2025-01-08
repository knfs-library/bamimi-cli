"use strict";
const auth = require("@iKernel/auth")
const jwt = auth.getJWT()

const errors = require("@iApp/http/errors/error-api-message")

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(400).sendData([
				{
					"msg": errors.auth.tokenNotExist,
					"key": "tokenNotExist"
				}
			])
		}

		const authorization = req.headers.authorization.split(" ");
		const typeAuth = authorization[0];

		if (!typeAuth || "Bearer" !== typeAuth) {
			return res.status(401).sendData([
				{
					"msg": errors.auth.authInvalid,
					"key": "authInvalid"
				}
			])
		}

		const token = authorization[1];
		const verifiedPayload = await jwt.verify(token).catch(error => {
			return {
				error
			}
		})

		if (!verifiedPayload || verifiedPayload.error) {
			return res.status(401).sendData([
				{
					"msg": errors.auth.tokenInvalid,
					"key": "tokenInvalid"
				}
			])
		}

		req.currentUser = verifiedPayload
		req.accessToken = token

		next()
	} catch (error) {
		console.error(error)
		return res.status(403).sendData({
			msg: "Auth error!"
		})
	}
}
