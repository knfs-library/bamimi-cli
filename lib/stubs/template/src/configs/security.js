"use strict";

module.exports = {
	/**
	 * Apply helmet 
	 * learn more at
	 *  @link https://helmetjs.github.io/
	 */
	helmetConfig: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			styleSrc: ["'self'", 'https:'],
		},
	},
	/**
	 * Apply xss
	 * 
	 * @link https://github.com/leizongmin/js-xss
	 */
	xssConfig: {
		
	}
};
