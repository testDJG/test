"use strict";
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var until = webdriver.until;

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.phantomjs()
).build();
module.exports = {
    loadPage: function () {

        return driver.get("http://localhost:3000");
    },
    getTitle: function () {

        return driver.getTitle();
    },


    isNavVisible: function () {

        driver.wait(until.elementIsVisible(driver.findElement(By.className('nav_items'))), 1000);

        return true;
    },

    getNumberOfNavigationItems: function () {

        var element = driver.findElement(By.className('nav_items'));

        return   element.findElements(By.className('nav_item')).
            then(function (elements) {

                return(elements.length);

            })
    },

    getNavItemText: function (itemNumber) {
        var element = driver.findElement(By.className('nav_items'));
        return element.findElements(By.className('nav_item'))
            .then(function (elements) {
                return elements[itemNumber - 1].getText()

            }).then(function (pageText) {

                return pageText;

            })
    },
    getNavItemHref: function (itemNumber) {
        var element = driver.findElement(By.className('nav_items'));
        return element.findElements(By.className('nav_item'))
            .then(function (elements) {
                return elements[itemNumber - 1].findElement(By.tagName('a'))
            })
            .then(function (element) {
                return element.getAttribute('href')
            })
            .then(function (attributeValue) {

                return(attributeValue);
            })
    },
quit: function () {

    driver.quit();
}
}
;
