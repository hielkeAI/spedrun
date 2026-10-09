const { educakeLogin } = require('../../archive/educake/puppeteer.js');

async function login({ username, password, type } = {}) {
    return { authToken: await educakeLogin(username, password, type || 'Normal') };
}

module.exports = login;
