

var getData = function(){
    qwest.get()
        .then(function(xhr, response) {
            console.log(response);
        })
        .catch(function(e, xhr, response) {
            // Process the error
        })
        .complete(function() {
            // Always run
        });
};