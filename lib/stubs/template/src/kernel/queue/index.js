
const queueConf = require("./../../configs/queue")
const { QueueManager } = require("@knfs-tech/bamimi-schedule")

module.exports = QueueManager.getInstance(queueConf)