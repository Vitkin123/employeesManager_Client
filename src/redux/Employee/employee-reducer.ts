import {Employee} from "../../Models/Employee";

interface EmployeeAction {
    type: string,
    payload: Employee[]
}

const INITIAL_STATE = {
    employees: [] as Employee[]
}

export const employeeReducer = (state = INITIAL_STATE, action: EmployeeAction) => {
    switch (action.type) {

        case "WriteEmployees":
            return {
                ...state,
                employees: action.payload
            }
        default :
            return state;
    }
}

