"use strict";
var By = require("selenium-webdriver").By;
var webdriver = require("selenium-webdriver");
var driver;
var assert = require("chai").assert;

gauge.step("Open the page <url>", function (url, done) {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.phantomjs()).build();
    driver.get(url).then(function () {
        done();
    });
});

gauge.step("Assert page title is <title>", function (title) {
    driver.getTitle().then(function (pageTitle) {
        assert.equal(pageTitle, title);
    })
});
