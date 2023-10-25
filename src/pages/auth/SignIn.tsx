import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required')
});

export const SignIn = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={SignInSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                try {
                    const response = await axios.post('http://localhost:5004/auth/login', values);
                    if (response.data.success) {
                        // Handle success - redirect, show message, etc.
                    } else {
                        // Handle login errors, e.g. wrong password, email not registered, etc.
                        setFieldError('email', 'Invalid email or password.');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    // Handle other API errors
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Sign In
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

