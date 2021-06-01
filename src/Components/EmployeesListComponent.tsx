import {Employee} from "../Models/Employee";
import {EmployeeComponent} from "./EmployeeComponent";
import {Grid} from "@material-ui/core";
import {AllEmployeeInformation} from "./AllEmployeeInformation";

interface Props {
    employees: Employee[],
}

export const EmployeesList = ({employees}: Props) => {
    return (
        <Grid container spacing={6} style={{marginTop: "50px"}}>
            {
                employees.map((employee) => {
                    return (
                        <Grid key={employee.id} item xs={3}>
                            <AllEmployeeInformation employee={employee}/>
                            {/*<EmployeeComponent key={employee.id} employee={employee}/>*/}
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}