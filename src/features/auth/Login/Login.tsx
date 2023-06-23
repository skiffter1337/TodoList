import React from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormikHelpers, useFormik } from 'formik';
import { authThunks } from 'features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCaptchaURL, selectIsLoggedIn } from 'features/auth/auth.selector';
import { LoginParamsType } from '../auth.api';
import s from '../Auth.module.css';
import { ResponseType } from '../../../common/types';
import { useActions } from '../../../common/hooks';

export const Login = () => {
  const { login } = useActions(authThunks);
  const captchaURL = useSelector(selectCaptchaURL);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const validate = (values: LoginParamsType) => {
    const errors: Partial<LoginParamsType> = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password is to short ';
    }
    // if (!values.captcha) {
    //   errors.captcha = 'Captcha is required';
    // }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    validate,
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: ResponseType) => {
          if (reason.fieldsErrors) {
            reason.fieldsErrors.forEach((el) => formikHelpers.setFieldError(el.field, el.error));
          }
        });
    },
  });

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <Grid container justifyContent={'center'} marginTop={'150px'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <div className={s.errorField}>{formik.errors.email}</div>}

              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password && (
                <div className={s.errorField}>{formik.errors.password}</div>
              )}

              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
              />
              {captchaURL && (
                <>
                  <img src={captchaURL} />
                  <TextField type="text" label="captcha" margin="normal" {...formik.getFieldProps('captcha')} />
                  {formik.touched.captcha && formik.errors.captcha && (
                    <div className={s.errorField}>{formik.errors.captcha}</div>
                  )}
                </>
              )}
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
