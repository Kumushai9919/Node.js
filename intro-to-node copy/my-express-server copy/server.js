const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("hello");
});

app.get("/me", function(req, res){
    res.send("it's me Kumushai")
})

app.listen(3000, function(){
    console.log("Server started on port 3000")
}); 