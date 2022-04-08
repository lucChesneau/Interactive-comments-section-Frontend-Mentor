function callDataJson(method){ 
        fetch("./data.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
                method(console.log(data));
        });
}

let dataComments = callDataJson();
console.log(dataComments);