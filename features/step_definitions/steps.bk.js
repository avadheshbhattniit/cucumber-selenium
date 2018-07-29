let { When, Then } = require('cucumber');
let { By, until, Key } = require('selenium-webdriver');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

// middleware
chai.use(chaiAsPromised);

let burgerButton = By.css('.bm-burger-button');
let loader = By.css('.reveal-overlay');

When('I go to MTP and activate the burger menu', function (next) {
    this.driver.get('https://trafalgar.mtp.qa.travcorpservices.com').then(() => {
        this.driver.manage().window().maximize();
        setTimeout(() => {
            this.driver.wait(until.elementIsNotVisible(loader));
            this.driver.wait(until.elementLocated(burgerButton), 3000);
            this.driver.findElement(burgerButton).click();
            next();
        }, 5000);
    });
});

Then('I Open Add my booking section and enter booking details', function (next) {
    let myTripCollapsibleButton = By.css('.side-menu__link div li:nth-child(2) a');
    this.driver.wait(until.elementLocated(myTripCollapsibleButton));
    setTimeout(() => {
        this.driver.findElement(myTripCollapsibleButton).click();
        let bookingForm = By.css('a[test-data="anchor');
        this.driver.wait(until.elementLocated(bookingForm));
        setTimeout(() => {
            this.driver.findElement(bookingForm).click();
            let bookingNumberTextField = By.css('input[test-data="bookingref"]');
            this.driver.wait(until.elementLocated(bookingNumberTextField));
            setTimeout(() => {
                this.driver.findElement(bookingNumberTextField).sendKeys('sunil-111');
                next();
            }, 2000);
        }, 2000);
    }, 2000);
});


Then('The Add my booking button should be enabled', function (next) {
    let bookingButton = By.css('[test-data="ambButton"][disabled]');
    setTimeout(() => {
        this.driver.findElements(bookingButton).then((results) => {
            return chai.expect(Promise.resolve(results.length)).to.eventually.equal(0).then(() => {
                next();
            }).catch(() => {
                next(new Error('You can not add booking, booking button is disabled'));
            });
        });
    }, 2000);
});