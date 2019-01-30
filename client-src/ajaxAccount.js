var AjaxCallouts = (function() {

    return {
        //function for making post requests to change the account name
        postAccount : function() {
            var sfid = document.getElementById('accountName').value;
            //Display any errors from salesforce or custom ones
            var ajaxRequest = new XMLHttpRequest();
            ajaxRequest.onreadystatechange = function() {
                if(this.readyState == 4) {
                    console.log('My call back function ' + this.readyState);
                    console.log(this.responseText + typeof this.responseText);
                    if(this.status == 400) {
                        var data = JSON.parse(this.responseText);
                        document.getElementById('postNameError').innerHTML = data.message;
                    } else if(this.status == 200) {
                        window.location.href = 'http://localhost:3000/accountManager/' + sfid;
                    }
                }
            };
    
            ajaxRequest.open('POST', 'http://localhost:3000/accountManager/ajax/' + sfid, true);
            ajaxRequest.send({
                Name : document.getElementById('accountName').value
            });
   
        }
    };
})();