let { When, Then, Given } = require('cucumber');
let { By, until, Key } = require('selenium-webdriver');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

// middleware
chai.use(chaiAsPromised);
let pauseTime = 1000;
let timeout = 10000;



Given('I open site url', function(next){
	let driver = this.driver;
	let loader = By.css('.reveal-overlay');
	let pauseBrowser = this.pauseBrowser;
	// driver.get('https://trafalgar.mtp.qa.travcorpservices.com').then(() => {
    driver.get('http://localhost:3000').then(() => {
        driver.manage().window().maximize();
        driver.wait(until.elementLocated(loader), timeout).then(function(){
			driver.wait(until.elementIsNotVisible(driver.findElement(loader))).then( () => {
				pauseBrowser(driver, next, pauseTime);
			});
		})
    });
});

Then('I check logo', function(next){
	let driver = this.driver;
	let logo = By.css('[data-test=logo]');
	let logoEl = driver.findElement(logo);
	let pauseBrowser = this.pauseBrowser;
	driver.wait(until.elementLocated(logo), timeout).then( () => {
    	driver.wait(until.elementIsVisible(logoEl)).then( () => {
			logoEl.getAttribute('data-test').then(function(value){
				console.log('******** dataTest ********', value);
				pauseBrowser(driver, next, pauseTime);
			});
		});
    });

});

When('I open burger menu', function(next){
	let driver = this.driver;
    let burgerButton = By.css('.bm-burger-button');
    let burgerButtonEl = driver.findElement(burgerButton)
    let pauseBrowser = this.pauseBrowser;
    driver.wait(until.elementLocated(burgerButton), timeout).then( () => {
    	driver.wait(until.elementIsVisible(burgerButtonEl)).then( () => {
			burgerButtonEl.click();
			pauseBrowser(driver, next, pauseTime);
    	});
    });
});

Then('I close trip section', function(next){
	let driver = this.driver;
    let myTripCollapsibleButton = By.css('.side-menu__link div li:nth-child(2) a');
    let myTripCollapsibleButtonEl = driver.findElement(myTripCollapsibleButton);
    let pauseBrowser = this.pauseBrowser;
    driver.wait(until.elementLocated(myTripCollapsibleButton), timeout).then(() => {
    	driver.wait(until.elementIsVisible(myTripCollapsibleButtonEl), timeout).then(() => {
    		myTripCollapsibleButtonEl.click();
		    pauseBrowser(driver, next, pauseTime);
    	});
    });
});

When('I Open Add my book section', function(next){
	let driver = this.driver;
	let addMyBookingSection = By.css('[test-data=anchor]');
	let pauseBrowser = this.pauseBrowser;
	driver.wait(until.elementLocated(addMyBookingSection), timeout).then( () => {
    	driver.wait(until.elementIsVisible(driver.findElement(addMyBookingSection)), timeout).then( () => {
			driver.findElement(addMyBookingSection).click();
			pauseBrowser(driver, next, pauseTime);
    	});
    });
});

Then('I Enter Booking ref', function(next){
	let driver = this.driver;
	let bookingRef = By.css('[test-data=bookingref]');
	let bookingRefEl = driver.findElement(bookingRef);
	let pauseBrowser = this.pauseBrowser;
	driver.wait(until.elementLocated(bookingRef), timeout).then( () => {
		driver.wait(until.elementIsVisible(bookingRefEl)).then( () => {
			bookingRefEl.sendKeys('avadh1234');
			pauseBrowser(driver, next, pauseTime);
		});
	});
});
