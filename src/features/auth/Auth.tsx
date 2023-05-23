import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch} from "redux/store/store";
import {loginTC} from "features/auth/authReducer";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.reducer";

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Auth = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)
const validate = (values: any) => {
        const errors: FormikErrorsType = {}
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 4) {
            errors.password = "Password is to short "
        }
        return errors
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });


    if(isLoggedIn) {
      return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'} marginTop={'150px'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>

                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField type="password" label="Password"
                                   margin="normal"  {...formik.getFieldProps('password')}/>
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox  {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}/>
                        }/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}