"use strict";

var page = require('../pages/sportHomePage');
var assert = require("chai").assert;

gauge.step("Open the page <url>", function (url, done) {
    page.loadPage(url).then(function () {
        done();
    })

        .catch(function (err) { console.log(err) })

        ;

});

gauge.step("Assert page title is <title>", function (title, done) {
    page.getTitle()
        .then(function (pageTitle) {
            assert.equal(pageTitle, title);
            done();

        });
});


gauge.step("Assert primary navigation bar is visible", function (done) {
    page.isPrimaryNavVisible().then(function (isDisplayed) {
        assert.isTrue(isDisplayed);
        done();
    })


});
gauge.step("Assert Secondary navigation is not visible", function (done) {
    page.isSecondaryNavVisible().then(function (isDisplayed) {
        assert.isFalse(isDisplayed);
        done();
    })

})


gauge.step("Assert navigation item <itemNumber> exists and has text <text> with link to <link>", function (itemNumber, text, link, done) {

    page.getNumberOfNavigationItems().then(function (items) {
        assert.isTrue(items >= itemNumber);

    });

    page.getNavItemText(itemNumber).then(function (linkText) {
        assert.equal(text, linkText);
    });

    page.getNavItemHref(itemNumber).then(function (href) {
        assert.equal(link, href);
        done();
    });

});

gauge.step("Assert primary navigation Items <table>", function (table, done) {

   
    table.rows.forEach(function (row, index, array) {
        page.isPrimaryNavItemPresent(row.cells[0])
            .then(function (text) {
                assert.equal(row.cells[1], text);
                if (index === array.length - 1) {
                    done();
                }
            })
    });
});

gauge.step("Assert elements present <table>",function (table,done){
    table.rows.forEach(function(row,index,array){
        page.isElementVisible(row.cells[0],row.cells[1])
        .then(function(isPresent){
            console.log(row.cells[1]);
            assert.isTrue(isPresent);
            if(index===array.length-1){
                done();
            }
        })
    })
})

gauge.hooks.afterSuite(function (done) {
    console.log('After suite');
page.quit();
});