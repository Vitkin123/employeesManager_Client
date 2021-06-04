import {Employee} from "../Models/Employee";
import axios from "axios";

export function writeEmployees() {
    return (dispatch: any) => {
        axios.get<Employee[]>("https://localhost:5001/api/Employees/GetEmployees").then(employees => {
            dispatch(getEmployeesSuccess(employees.data))
            console.log(employees.data)
        }).catch(e => {
            dispatch(getEmployeesFailed(e));
        })
    }
}

export function writeAllEmployeesInfo(token: string, tokenType: string) {
    return (dispatch: any) => {
        const config = {
            headers: {Authorization: `${tokenType} ${token}`}
        };
        axios.get("https://localhost:5001/api/Employees/GetAllEmployeesData",
            config).then((response => {
            dispatch(getEmployeesSuccess(response.data))
        })).catch(e => {
            dispatch(getEmployeesFailed(e))
        });
    }
}


export function signIn(email: string, password: string) {
    return (dispatch: any) => {
        const config = {
            email: email,
            password: password
        }
        axios.post("https://localhost:5001/api/Auth/LogIn", config).then(response => {
            dispatch(signInSuccess(response.data));
        }).catch((e) => {
            console.log("User not found", e)
            dispatch(signInFailed(e));
        })
    }
}


const getEmployeesSuccess = (employees: Employee[]) => ({
    type: "WriteEmployees",
    payload: employees
})
const getEmployeesFailed = (e: Error) => ({
    payload: {
        e: e.message
    }
})
const signInSuccess = (signInData: any) => ({
    type: "SignIn",
    payload: {
        role: signInData.role,
        token: signInData.access_token,
        tokenType: signInData.token_type,
        signedIn: true
    }
});
const signInFailed = (e: Error) => ({
    type: "SignIn",
    payload: {
        error: e.message
    }
});

