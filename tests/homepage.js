"use strict";

var homepage = require('../pages/homePage');
var assert = require("chai").assert;

gauge.step("Open the page <url>", function (url, done) {
    homepage.loadPage().then(function(){
        done();
    })

    .catch(function(err){console.log(err)})

    ;

});

gauge.step("Assert page title is <title>", function (title, done) {
    homepage.getTitle()
        .then(function (pageTitle) {
            assert.equal(pageTitle, title);
            done();

        });
});


gauge.step("Assert navigation exists", function (done) {

    homepage.isNavVisible()

    done();
});


gauge.step("Assert navigation item <itemNumber> exists and has text <text> with link to <link>", function (itemNumber, text, link, done) {

    homepage.getNumberOfNavigationItems().then(function (items) {
        assert.isTrue(items >= itemNumber);

    });

    homepage.getNavItemText(itemNumber).then(function (linkText) {
        assert.equal(text, linkText);
    });

    homepage.getNavItemHref(itemNumber).then(function (href) {
        assert.equal(link, href);
        done();
    });

});

gauge.hooks.afterSuite(function () {
    homepage.quit();
});