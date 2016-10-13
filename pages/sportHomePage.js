"use strict";
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var until = webdriver.until;
const primaryNav = By.className('primary-nav');
const secondaryNav = By.className('secondary-nav');
var promise = require('bluebird');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()
).build();
module.exports = {
    loadPage: function (url) {

        return driver.get(url);
    },
    getTitle: function () {

        return driver.getTitle();
    },

    isPrimaryNavVisible: function () {

       return isElementVisible(primaryNav);

    },

    isSecondaryNavVisible: function () {
        return isElementVisible(secondaryNav);

    },

    getNumberOfNavigationItems: function () {

        var element = driver.findElement(By.className('nav_items'));

        return element.findElements(By.className('nav_item')).
            then(function (elements) {

                return (elements.length);

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

                return (attributeValue);
            })
    },
    quit: function () {
        driver.quit();
    },
    isPrimaryNavItemPresent: function (item) {
       
        return isElementVisible(primaryNav)
            .then(function (isVisible) {
                if (isVisible) {
                    return driver.findElements(By.className('primary-nav__item'))
                        .then(function (elements) {
                            
                            return elements[item].getText();
                        })


                }

            }
            )

    },
    isElementVisible:function(selector,selectorName){
        var by;
        if(selector=='id'){
           
            by=By.id(selectorName);
        }
        return isElementVisible(by);
    }


};



function isElementVisible(by) {
    const timeout = 2000;

    return driver.wait(webdriver.until.elementLocated(by), timeout)
        .then(function () {
       
            return driver.findElement(by)
        })
        .then(function (element) {
           
            return driver.wait(webdriver.until.elementIsVisible(element), timeout)
        })
        .then(function () {
            
            return true;
        })
        .catch(function (err) {
       
            return false
        });
}