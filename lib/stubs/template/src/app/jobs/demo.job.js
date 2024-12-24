
module.exports = {
	name: "demo",
	queue: "demoQueue",
	handle: async function (job) {
		console.log(`Demo Queue`);
	}
};