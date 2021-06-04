import {Employee} from "../Models/Employee";
import {EmployeeComponent} from "./EmployeeComponent";
import {Grid} from "@material-ui/core";
import {AllEmployeeInformation} from "./AllEmployeeInformation";
import {useSelector} from "react-redux";
import {RootState} from "../redux/root-reducer";


export const EmployeesList = () => {

    const store = useSelector((state: RootState) => state.employeeStore);
    let employees = store.employees;
    console.log(employees)

    return (
        <Grid container spacing={6} style={{marginTop: "50px"}}>
            {
                employees.map((employee) => {
                    return (
                        <Grid key={employee.id} item xs={3}>
                            <AllEmployeeInformation employee={employee}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}