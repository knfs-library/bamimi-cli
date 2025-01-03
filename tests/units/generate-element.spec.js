const fs = require('fs-extra');
const elementGenerator = require('../../lib/handlers/generateElements');

jest.mock('fs-extra');

describe('Element Generator', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const removeWhitespace = (str) => str.replace(/\s+/g, '');

		test('generateController should create a controller file', async () => {
			const targetPath = './testController.js';
			const name = 'TestController';
			const funcList = ['testFunc1', 'testFunc2'];
			const type = 'api';

			fs.pathExists.mockResolvedValue(true);
			fs.readFile.mockResolvedValue(`
	"use strict";

	module.exports = {
	    index: async function (req, res) {
	        await res.send("Hello World");
	    },
	    // more
	};`);

			await elementGenerator.generateController(targetPath, name, funcList, type);

			const expectedContent = `
	"use strict";

	module.exports = {
	    index: async function (req, res, next) {
			try {
	        	await res.status(200).sendData({ msg: 'ok' });
			} catch(error) {
				next(error)
			}
	    },

	    testFunc1: async function (req, res, next) {
			try {
				// testFunc1 implementation
				await res.status(200).sendData({ msg: 'ok' });
			} catch(error) {
				next(error)
			}
	    },

	    testFunc2: async function (req, res, next) {
			try {
				// testFunc2 implementation
				await res.status(200).sendData({ msg: 'ok' });
			} catch(error) {
				next(error)
			}
	    },
	};`;

			const [capturedPath, capturedContent] = fs.writeFile.mock.calls[0];

			expect(capturedPath).toBe(targetPath);
		});

		test('generateMiddleware should create a middleware file', async () => {
			const targetPath = './testMiddleware.js';
			const name = 'TestMiddleware';

			fs.pathExists.mockResolvedValue(true);
			fs.readFile.mockResolvedValue(`
	"use strict";

	module.exports = async (req, res, next) => {
		// more
	};`);

			await elementGenerator.generateMiddleware(targetPath, name);

			const expectedContent = `
	"use strict";

	module.exports = async (req, res, next) => {
	    // TestMiddleware implementation
	};`;

			const [capturedPath, capturedContent] = fs.writeFile.mock.calls[0];

			expect(capturedPath).toBe(targetPath);

			// Assert the content is correct after removing whitespace
			expect(removeWhitespace(capturedContent)).toBe(removeWhitespace(expectedContent));
		});

		test('generateRequest should create a request file', async () => {
			const targetPath = './testRequest.js';
			const name = 'TestRequest';

			fs.pathExists.mockResolvedValue(true);
			fs.readFile.mockResolvedValue(`
	"use strict";
	const { body } = require("express-validator");

	module.exports = [
		// more
	]`);

			await elementGenerator.generateRequest(targetPath, name);

			const expectedContent = `
	"use strict";
	const { body } = require("express-validator");

	module.exports = [
	    // TestRequest implementation
	]`;

			const [capturedPath, capturedContent] = fs.writeFile.mock.calls[0];

			// Assert the target path is correct
			expect(capturedPath).toBe(targetPath);

			// Assert the content is correct after removing whitespace
			expect(removeWhitespace(capturedContent)).toBe(removeWhitespace(expectedContent));
		});

	test('generateEmail should create an email file', async () => {
		const targetPath = './testEmail.js';
		const name = 'TestEmail';
		const options = {
			templateEmail: false,
			job: false
		};

		// Mock the file system methods
		fs.pathExists.mockResolvedValue(true);
		fs.readFile.mockImplementation(async (filePath) => {
			if (filePath.endsWith('email.stub')) {
				return `
"use strict";

const { sendMail } = require("../../utils/mail");
// render
// queue

module.exports = (data) => {
    // content

    // more
};
`;
			}
			
		});

		

		await elementGenerator.generateEmail(targetPath, name, options);

		const expectedContent = `
"use strict";
const { sendMail } = require("../../utils/mail");

module.exports = (data) => {
    const text = 'Hello word!';
    sendMail({ to: data.email, subject: "Welcome to Bamimi land", text: text  });
};
`;

		// Capture the arguments passed to fs.writeFile
		const [capturedPath, capturedContent] = fs.writeFile.mock.calls[0];

		// Assert the target path is correct
		expect(capturedPath).toBe(targetPath);

		// Assert the content is correct after removing whitespace
		expect(removeWhitespace(capturedContent)).toBe(removeWhitespace(expectedContent));
	});

	test('generateJob should create a job file', async () => {
		const targetPath = './testJob.js';
		const name = 'TestJob';
		const options = {
			importModule: 'const { sendMail } = require("../../utils/mail");',
			handle: 'await sendMail(job.data);'
		};

		fs.pathExists.mockResolvedValue(true);
		fs.readFile.mockResolvedValue(`
"use strict";
// import

module.exports = {
    name: "// jobName",
    queue: "// queueName",
    handle: async function (job) {
		// handle
    }
};`);

		await elementGenerator.generateJob(targetPath, name, options);

		const expectedContent = `
"use strict";
const { sendMail } = require("../../utils/mail");

module.exports = {
    name: "TestJob",
    queue: "TestJob",
    handle: async function (job) {
		await sendMail(job.data);
    }
};`;

		const [capturedPath, capturedContent] = fs.writeFile.mock.calls[0];

		expect(capturedPath).toBe(targetPath);

		expect(removeWhitespace(capturedContent)).toBe(removeWhitespace(expectedContent));
	});
});
