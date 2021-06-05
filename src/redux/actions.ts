import {Employee} from "../Models/Employee";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

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

export function writeAllEmployeesInfo(token: string | null, tokenType: string | null) {
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

export function rememberMe(remember: boolean) {
    window.localStorage.setItem("isRemember", String(remember));
    return {
        type: "RememberMe",
        payload: {
            isRememberMe: remember
        }
    }
}


export function signUp(employee: Employee) {
    console.log(employee)
    const id = uuidv4();

    return (dispatch: any) => {
        const config = {
            id: id,
            email: employee.email,
            password: employee.password,
            name: employee.name,
            lastName: employee.lastName,
            position: employee.position,
            monthsOfExperience: employee.monthsOfExperience,
            birthDate: employee.birthDate,
            startWorkingDate: employee.startWorkingDate
        }
        console.log(config)
        axios.post("https://localhost:5001/api/Auth/SignUp", config).then(response => {
            console.log(response.data);
            dispatch(signUpSuccess("Sign up success"));
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
const signInSuccess = (signInData: any) => {

    window.sessionStorage.setItem("token", signInData.access_token);
    window.sessionStorage.setItem("tokenType", signInData.token_type);
    window.sessionStorage.setItem("role", signInData.role);


    return {
        type: "SignIn",
        payload: {
            role: signInData.role,
            token: signInData.access_token,
            tokenType: signInData.token_type,
            signedIn: true
        }
    }
};
const signInFailed = (e: Error) => ({
    type: "SignIn",
    payload: {
        error: e.message
    }
});
const signUpSuccess = (message: string) => {
    console.log(message)
    return {
        type: "SignUp",
        payload: {
            message: message
        }
    }
}
const signUpFailed = (e: Error) => {

}

