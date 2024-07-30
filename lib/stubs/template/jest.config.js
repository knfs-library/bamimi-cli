/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
    clearMocks: false,
    collectCoverage: false,
    coverageDirectory: "coverage",

    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    coverageReporters: [
        "json",
        "text",
        "lcov",
        "clover"
    ],

    // An array of file extensions your modules use
    moduleFileExtensions: [
        "js",
        "json",
    ],

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        "./tests"
    ],

    // Allows you to use a custom runner instead of Jest's default test runner
    runner: "jest-runner",

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/__tests__/**/*.js",
        "**/?(*.)+(spec|test).js"
    ],

    // This option allows use of a custom test runner
    testRunner: "jest-circus/runner",
    setupFiles: ["./tests/setup.js"],
};
