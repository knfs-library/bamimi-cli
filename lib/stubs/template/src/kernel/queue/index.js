
const queueConf = require("@iConfigs/queue")
const { QueueManager } = require("@knfs-tech/bamimi-schedule")
const queueManager = new QueueManager(queueConf)

module.exports = queueManager