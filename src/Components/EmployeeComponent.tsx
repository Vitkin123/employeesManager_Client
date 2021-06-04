import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Employee} from "../Models/Employee";

interface Prop {
    employee: Employee
}

export const EmployeeComponent = ({employee}: Prop) => {
    const {id, name, lastName} = employee;

    return (
        <Card>
            <CardContent>
                <img
                    src="https://image.shutterstock.com/image-vector/woman-illustration-face-shoulders-avatar-260nw-1751124959.jpg"
                    alt="Italian Trulli"/>
                <Typography color="textSecondary" gutterBottom>
                    {name}
                </Typography>
                <Typography color="textSecondary">
                    {lastName}
                </Typography>
            </CardContent>
        </Card>
    );
}