import React, {FormEvent, RefObject, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {rememberMe, signIn} from "../redux/actions";
import {RootState} from "../redux/root-reducer";

const Copyright = () => {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link to={""} style={{color: "black"}}>
                Employees manager
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const SignInComponent = () => {

    const dispatch = useDispatch();
    const reference: RefObject<HTMLButtonElement> = React.createRef();
    const classes = useStyles();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    function handleRememberMe(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(rememberMe(event.target.checked));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        dispatch(signIn(email, password));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const store = useSelector((state: RootState) => state.signInStore)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox ref={reference} checked={store.isRememberMe} value="remember" color="primary"
                                           onChange={handleRememberMe}/>}
                        label="Remember me"
                    />
                    <Button
                        type={"submit"}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}

                    >
                        Sign In
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link to="/signUp" style={{textDecoration: 'none', color: "black"}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}