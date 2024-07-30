
module.exports = async function (req, res, next) {
    res.status(404);
    if (req.accepts("html")) {
        return await res.redirect("/404");
    }

    if (req.accepts("json")) {
        return await res.sendMessage();
    }
    next();
};