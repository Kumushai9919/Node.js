const express = require("express");
const mysql = require("mysql");
const cors = require("cors"); //if u gonna make request from ur frontend into backend into your own api(http://localhost:3001/create), u need to allow it by using cors
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors()); 
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "employeeCRUDSystem"
});

//we have post request to insert data
app.post("/create", (req, res) =>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    const sqlInsert = "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)";

    db.query(sqlInsert, [name, age, country, position, wage], 
        (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("inserted");
        }
    });
});

//and get request to read data
app.get("/employees", (req, res) =>{
    const sqlSelect = "SELECT * FROM employees";

    db.query(sqlSelect, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//update
app.put("/update", (req, res) =>{
    const id = req.body.id;
    const wage = req.body.wage;
    const sqlUpdate = "UPDATE employees SET wage = ? WHERE id = ?";

    db.query(sqlUpdate, [wage, id], (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

//delete
app.delete("/delete/:id", (req, res) =>{
    const id = req.params.id;
    const sqlDelete = "DELETE FROM employees WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
})




app.listen("3001", ()=>{
    console.log("your server is running on port 3001");
})