import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/root-reducer";
import {rememberMe, signIn, writeAllEmployeesInfo, writeEmployees} from "./redux/actions";
import {AdminRole, EmployeeRole} from "./roles";
import {Switch, Route, Redirect} from "react-router-dom";
import {SignInComponent} from "./Components/SignInComponent";
import {SignUpComponent} from "./Components/SignUpComponent";
import {EmployeesList} from "./Components/EmployeesListComponent";


function App() {

    const dispatch = useDispatch();
    const store = useSelector((state: RootState) => state.signInStore)
    const getEmployees = () => {
        dispatch(writeEmployees());
    }


    const setTokenDataToLocalStorage = () => {
        if (store.isRememberMe) {
            window.localStorage.setItem("tokenType", store.tokenType)
            window.localStorage.setItem("token", store.token)
        } else if (!store.isRememberMe) {
            window.localStorage.setItem("tokenType", "")
            window.localStorage.setItem("token", "")
        }
    }

    const getAllEmployeesInfo = () => {
        dispatch(writeAllEmployeesInfo(getSessionStorageData().token, getSessionStorageData().tokenType))
    }
    useEffect(() => {
        dispatch(rememberMe(window.localStorage.getItem("isRemember") === "true"));
    }, [store.isRememberMe])


    const getSessionStorageData = () => {
        const token = sessionStorage.getItem("token");
        const tokenType = sessionStorage.getItem("tokenType");
        const role = sessionStorage.getItem("role");

        return {
            token: token,
            tokenType: tokenType,
            role: role
        }
    }


    useEffect(() => {
        if (getSessionStorageData().role === AdminRole) {
            getAllEmployeesInfo();
        } else if (getSessionStorageData().role === EmployeeRole) {
            getEmployees()
        }

    }, [])

    useEffect(() => {
        if (store.role === AdminRole) {
            getAllEmployeesInfo();
        } else if (store.role === EmployeeRole) {
            getEmployees()
        }
        setTokenDataToLocalStorage();
    }, [store.signedIn])


    return (
        <Switch>
            <Route exact path="/"
                   render={() => store.signedIn ? (<Redirect to={"/employeesList"}/>) : (<SignInComponent/>)}/>
            <Route path={"/signUp"} component={SignUpComponent}/>
            <Route path={"/employeesList"} component={EmployeesList}/>
        </Switch>
    )
}

export default App;
