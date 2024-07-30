
const queueConf = require("../../configs/queue");

const { Queue, Worker } = require("bullmq");

const connection = {
    host: queueConf.storage.host,
    port: queueConf.storage.port,
    username: queueConf.storage.username ?? undefined,
    password: queueConf.storage.password ?? undefined
};
/**
 * Config global queues
 */
const Queues = {};

/**
 * Config global workers
 */
const Workers = {};

const getQueue = (queueName) => {
    if (!Queues.queueName) {
        Queues.queueName = new Queue(queueName, {
            connection: connection,
            defaultJobOptions: {
                removeOnComplete: true,
                removeOnFail: false,
            },
        });
    }
    return Queues.queueName;
};

const getWorker = (queueName, handleJob) => {
    if (!Workers.queueName) {
        Workers.queueName = new Worker(queueName, handleJob, {
            connection: connection,
        });
    }
    return Workers.queueName;
};


module.exports = {
    getQueue: getQueue,
    getWorker: getWorker,
};