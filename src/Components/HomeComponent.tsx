import React, {useEffect} from "react";
import {EmployeesList} from "./EmployeesListComponent";
import {SignInComponent} from "./SignInComponent";
import {useDispatch, useSelector, useStore} from "react-redux";
import {writeAllEmployeesInfo, writeEmployees} from "../redux/actions";
import {RootState} from "../redux/root-reducer";
import {AdminRole, EmployeeRole} from "../roles";


const HomeComponent = () => {

    const dispatch = useDispatch();
    const store = useSelector((state: RootState) => state.signInStore)


    const getEmployees = () => {
        dispatch(writeEmployees());
    }

    const getAllEmployeesInfo = () => {
        dispatch(writeAllEmployeesInfo(store.token, store.tokenType))
    }


    useEffect(() => {
        if (store.role === AdminRole) {
            getAllEmployeesInfo();
        } else if (store.role === EmployeeRole) {
            getEmployees()
        }
    }, [store.signedIn])

    return (
        <div>
            {
                store.signedIn ? <EmployeesList/> :
                    <SignInComponent/>
            }
        </div>
    )
}


export default HomeComponent;