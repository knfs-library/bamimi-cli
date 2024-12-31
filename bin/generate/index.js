
module.exports = (runCommand) => {
	require("./generate-app.cli")(runCommand)
	require("./generate-controller.cli")(runCommand)
	require("./generate-docker.cli")(runCommand)
	require("./generate-email.cli")(runCommand)
	require("./generate-interface.cli")(runCommand)
	require("./generate-job.cli")(runCommand)
	require("./generate-middleware.cli")(runCommand)
	require("./generate-request.cli")(runCommand)
	require("./generate-test-config.cli")(runCommand)
	require("./generate-lint.cli")(runCommand)
	require("./generate-db.cli")(runCommand)
}