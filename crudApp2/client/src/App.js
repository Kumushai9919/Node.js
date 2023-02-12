import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPostion] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [newEmploy, setNewEmployee] = useState('');
  const [newWage, setNewWage] = useState(0);

//insert
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      //we're passing these objects to our back-end-this url "http://localhost:3001/create" so there we can get these object like this (req.body.name etct)
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      //and we're adding to our DB mysql too 
      setEmployeeList([
        ...employeeList, 
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        },
      ]);
    });
  };

  //get
  const showEmployee = () => {
    Axios.get("http://localhost:3001/employees").then((response)=>{
      setEmployeeList(response.data);
      // console.log(response);  
    });
  }

  //update
  const updateEmployee = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id
    }).then((response) => {
       setEmployeeList(employeeList.map((val) => {
        return val.id == id ? {id: val.id, name: val.name, age: val.age, country: val.country, position: val.position, wage: newWage} : val
       }))
     }
    );
  };

//delete
const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) =>{
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id
      }))
    });  
}

  return (
    <div className="App">
      <div className='information'>

        <label>Name: </label>
        <input type="text" onChange={(event) => {
          setName(event.target.value);
        }}
        />
        <label>Age: </label>
        <input type="number" onChange={(event) => {
          setAge(event.target.value);
        }}
        />
        <label>Country: </label>
        <input type="text" onChange={(event) => {
          setCountry(event.target.value);
        }}
        />
        <label>Position: </label>
        <input type="text" onChange={(event) => {
          setPostion(event.target.value);
        }}
        />
        <label>Wage (year): </label>
        <input type="number" onChange={(event) => {
          setWage(event.target.value);
        }}
        />
        <button onClick={addEmployee}>Add Employee</button>

      </div>

      <div className='employees'>
        <button onClick={showEmployee}>Show Employees</button>
     
        {employeeList.map((val, key) => {
            return (
              <div className='employee'>

                <div>
                 <h4>Name: {val.name}</h4>
                 <h4>Age: {val.age}</h4>
                 <h4>Country: {val.country}</h4>
                 <h4>Position: {val.position}</h4>
                 <h4>Wage($): {val.wage}</h4>
                 </div>
                 
                 <div>
                 {" "}
                  <input type="text" placeholder='wage' onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                  ></input> 
                  <button onClick={() => {updateEmployee(val.id)}}>
                  Update</button>
                  <button onClick={() => {deleteEmployee(val.id)}}>
                  Delete</button>
                 </div>
                 
               </div>
            )

        })}
     
     
     
      </div>

    </div>
  );
}

export default App;
