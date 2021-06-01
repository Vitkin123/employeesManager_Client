import axios from "axios";
import {useState, useEffect} from "react";
import {EmployeesList} from "./EmployeesListComponent";
import {Employee} from "../Models/Employee";
import {SignInComponent} from "./SignInComponent";
import {log} from "util";
import {AdminRole, EmployeeRole} from "../roles";


const HomeComponent = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isSignedIn, setSignedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [tokenType, setTokenType] = useState<string>("");
    const [role, setRole] = useState<string>("");


    const getEmployees = () => {
        axios.get<Employee[]>("https://localhost:5001/api/Employees/GetEmployees").then(employees => {
            setEmployees(employees.data);
        })
    }

    const onSignIn = (email: string, password: string) => {
        const config = {
            email: email,
            password: password
        }

        axios.post("https://localhost:5001/api/Auth/LogIn", config).then(response => {
            setRole(response.data.role);
            setToken(response.data.access_token);
            setTokenType(response.data.token_type);
            setSignedIn(true);
        }).catch((e) => {
            console.log("User not found", e)
            setSignedIn(false);
        })

    }

    const getAllEmployeesInfo = (token: string, tokenType: string) => {
        const config = {
            headers: {Authorization: `${tokenType} ${token}`}
        };
        axios.get("https://localhost:5001/api/Employees/GetAllEmployeesData",
            config).then((response => {
            setEmployees(response.data)
        }));
    }

    useEffect(() => {
        if (role === AdminRole) {
            getAllEmployeesInfo(token, tokenType);
        } else if (role === EmployeeRole) {
            getEmployees()
        }
    }, [isSignedIn])

    return (
        <div>
            {
                isSignedIn ? <EmployeesList employees={employees}/> : <SignInComponent signIn={onSignIn}/>
            }
        </div>
    )
}


export default HomeComponent;