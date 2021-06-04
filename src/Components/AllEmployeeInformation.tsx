import {Employee} from "../Models/Employee";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";

interface Prop {
    employee: Employee
}

export const AllEmployeeInformation = ({employee}: Prop) => {

    const {name, lastName, email, birthDate, startWorkingDate, salary, position, monthsOfExperience} = employee;
    return (
        <div>
            <Card style={{marginBottom: "12px"}}>
                <img
                    style={{maxHeight: "150px", maxWidth: "150px"}}
                    src="https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg"
                    alt="Italian Trulli"/>
            </Card>
            <Card>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {name}
                    </Typography>
                    <Typography color="textPrimary">
                        {lastName}
                    </Typography>
                    <Typography color="textPrimary">
                        {email}
                    </Typography>
                    <Typography color="textPrimary">
                        {birthDate}
                    </Typography>
                    <Typography color="textPrimary">
                        {startWorkingDate}
                    </Typography>
                    <Typography color="textPrimary">
                        {salary}
                    </Typography>
                    <Typography color="textPrimary">
                        {position}
                    </Typography>
                    <Typography color="textPrimary">
                        {monthsOfExperience}
                    </Typography>


                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>


    )


}