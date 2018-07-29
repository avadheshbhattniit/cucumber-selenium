
const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
let seleniumWebdriver = require('selenium-webdriver');
let automationConfig = require('../../automation.config.js');
require('chromedriver');

setDefaultTimeout(60 * 1000);

let config = {
    BROWSER_NAME: automationConfig.getBrowserName(),
    SERVER: automationConfig.getServer(),
    CAPABILITY: automationConfig.getCapability(),
    BS_USER_NAME: automationConfig.getBrowserstackUsername(),
    BS_ACCESS_KEY: automationConfig.getBrowserstackAccessKey()
};

let capabilitiesList = {
    'windows-chrome': {
        browserName: 'Chrome',
        browser_version: '67.0',
        os: 'Windows',
        os_version: '7',
        resolution: '1280x1024'
    },
    'android-chrome': {
        browserName: 'chrome',
        device: 'Samsung Galaxy S7',
        realMobile: 'true'
    }
};

class CustomWorld {
    constructor() {
        this.World();
    }
    World() {
        let capabilities;
        if (config.SERVER === 'browserstack') {
            capabilities = capabilitiesList[config.CAPABILITY];

            capabilities['browserstack.user'] = config.BS_USER_NAME;
            capabilities['browserstack.key'] = config.BS_ACCESS_KEY;

            // Input capabilities for browserstack only
            this.driver = new seleniumWebdriver.Builder()
                .usingServer('http://hub-cloud.browserstack.com/wd/hub')
                .withCapabilities(capabilities)
                .build();
        } else if (config.SERVER === 'localhost') {
            this.driver = new seleniumWebdriver.Builder().forBrowser(config.BROWSER_NAME).build();
        }
    }
}


setWorldConstructor(CustomWorld);
