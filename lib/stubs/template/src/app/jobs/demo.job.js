
module.exports = {
	name: "demo",
	queue: "demoQueue",
	queueManager: "bullmq",
	handle: async function (job) {
		console.log(`Demo Queue`);
	}
};