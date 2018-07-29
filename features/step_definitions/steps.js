let { When, Then, Given } = require('cucumber');
let { By, until, Key } = require('selenium-webdriver');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

// middleware
chai.use(chaiAsPromised);

let burgerButton = By.css('.bm-burger-button');
let loader = By.css('.reveal-overlay');


Given('I open site url', function(next){
	let driver = this.driver;
    driver.get('https://trafalgar.mtp.qa.travcorpservices.com').then(() => {
        driver.manage().window().maximize();
        setTimeout(() => {
            next();
        }, 5000);
    });
});

When('I open burger menu', function(next){
	let driver = this.driver;
    let burgerButton = By.css('.bm-burger-button');
    driver.wait(until.elementLocated(burgerButton), 10000).then( () => {
    	driver.wait(until.elementIsVisible(driver.findElement(burgerButton)), 10000).then( () => {
    	driver.findElement(burgerButton).click();
	    next();
    	});
    });
});

Then('I close trip section', function(next){
	let driver = this.driver;
    let myTripCollapsibleButton = By.css('.side-menu__link div li:nth-child(2) a');
    driver.wait(until.elementLocated(myTripCollapsibleButton), 10000).then(() => {
    	driver.wait(until.elementIsVisible(driver.findElement(myTripCollapsibleButton)), 10000).then(() => {
    		driver.findElement(myTripCollapsibleButton).click();
		    next();
    	});
    });
});

When('I Open Add my book section', function(next){
	let driver = this.driver;
	let addMyBookingSection = By.css('[test-data=anchor]');
	driver.wait(until.elementLocated(addMyBookingSection), 10000).then( () => {
    	driver.wait(until.elementIsVisible(driver.findElement(addMyBookingSection)), 10000).then( () => {
    	driver.findElement(addMyBookingSection).click();
	    next();
    	});
    });
});

Then('I Enter Booking ref', function(next){
	let driver = this.driver;
	let bookingRef = By.css('[test-data=bookingref]');
	driver.wait(until.elementLocated(bookingRef), 10000).then( () => {
		driver.wait(until.elementIsVisible(driver.findElement(bookingRef)), 10000).then( () => {
			driver.findElement(bookingRef).sendKeys('avadh1234');
			setTimeout(() => {
		        next();
		    }, 5000);
		});
	});
});
