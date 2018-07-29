require('dotenv').config();

let config = {
    getBrowserName: () => {
        return process.env.BROWSER_NAME || 'chrome';
    },
    getServer: () => {
        return process.env.SERVER || 'localhost';
    },
    getCapability: () => {
        return process.env.CAPABILITY || 'android-chrome';
    },
    getBrowserstackUsername: () => {
        return process.env.BROWSERSTACK_USERNAME || 'please set the user';
    },
    getBrowserstackAccessKey: () => {
        return process.env.BROWSERSTACK_ACCESS_KEY || 'please set the key';
    }
};

module.exports = config;