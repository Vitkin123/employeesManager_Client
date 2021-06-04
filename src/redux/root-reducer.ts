import {combineReducers} from "redux";
import {employeeReducer} from "./Employee/employee-reducer";
import {signInReducer} from "./SignInSignUp/sign-in-sign-up-reducer";



export const rootReducer = combineReducers({
    employeeStore: employeeReducer,
    signInStore: signInReducer
});
export type RootState = ReturnType<typeof rootReducer>