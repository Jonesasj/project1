'use strict';

function ajaxTest() {
    var sfid = document.getElementById('sfid').value;
    if(sfid == '') {
        alert('Please enter an id');
    } else {
        //If an error message is returned display it on this home page
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
            if(this.readyState == 4) {
                console.log('My call back function ' + this.readyState);
                console.log(this.responseText + typeof this.responseText);
                if(this.status == 400) {
                    var data = JSON.parse(this.responseText);
                    document.getElementById('sfidError').innerHTML = data.message;
                } else if(this.status == 200) {
                    window.location.href = 'http://localhost:3000/accountManager/' + sfid;
                }
            }
        };

        ajaxRequest.open('GET', 'http://localhost:3000/accountManager/ajax/' + sfid, true);
        ajaxRequest.send();
    }
};