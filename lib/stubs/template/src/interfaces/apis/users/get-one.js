"use strict";
module.exports = (user) => {
	return {
		id: user.id ?? null,
		name: user.name ?? null,
		age: user.age ?? null
	}
}