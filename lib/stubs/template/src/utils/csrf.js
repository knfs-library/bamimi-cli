
module.exports = {
    input: (csrfToken) => {
        return `<input type="hidden" name="_csrf" value="${csrfToken}">`;
    },
    url: (url, csrfToken) => {
        let newUrl = new URL(url);
        newUrl.searchParams.append("_csrf", csrfToken);

        return newUrl;
    }
};