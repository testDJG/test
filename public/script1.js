/**
 * Created by gauntd01 on 05/10/2016.
 */
var isTextBoxEnabled = false;
window.addEventListener('load', function () {
    var pushButton = document.querySelector('.js-push-button');
    pushButton.addEventListener('click', function () {
        if (isTextBoxEnabled) {
            console.log('disabling textbox');
            disableTextBox();
        } else {
            console.log('enabling textbox');
            enableTextBox();
        }
    })
});


window.addEventListener('load', function () {
    var inputbox = document.querySelector('.js-text-box');
    inputbox.addEventListener('keydown', function () {

        disableTextBox();

    })
});

function enableTextBox(){
    isTextBoxEnabled=true;
    var inputbox=document.querySelector('.js-text-box');
    inputbox.disabled=false;
}
function disableTextBox(){
    isTextBoxEnabled=false;
    var inputbox=document.querySelector('.js-text-box');
    inputbox.disabled=true;
}
