function ajaxTest() {
    var sfid = document.getElementById('sfid').value;


    if(sfid == '') {
        alert('Please enter an id');
    } else {
        //If an error message is returned display it on this home page
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
            if(ajaxRequest.readyState == 4) {
                console.log('My call back function ' + ajaxRequest.readyState);
                console.log(ajaxRequest.responseText + typeof ajaxRequest.responseText);
                var data = JSON.parse(ajaxRequest.responseText);
                console.log(data + typeof data);
                if(data.message) {
                    document.getElementById('sfidError').innerHTML = data.message;
                }
            }
        };

        ajaxRequest.open('GET', 'http://localhost:3000/accountManager/ajax/' + sfid, true);
        ajaxRequest.send();
    }
};