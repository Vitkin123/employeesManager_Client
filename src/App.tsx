import React from 'react';
import './App.css';
import axios from "axios";

function App() {


    async function getAllEmployees() {
        const res = await axios.get("https://localhost:5001/api/Employees/GetEmployees");
        console.log(res);
    }

    getAllEmployees();

    return (
        <div className="App">
            Hello
        </div>
    );
}

export default App;
