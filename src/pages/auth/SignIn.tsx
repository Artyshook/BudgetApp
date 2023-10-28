import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UseRedirect from "../../hooks/UseRedirect";
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required')
});


const handleSubmit = async (data, { setSubmitting, setFieldError }, setCookie, navigate) => {
    try {
        const response = await axios.post('http://localhost:5004/auth/login', data);
        if (response.data.token) {
            console.log(response.data.userID, response.data.userRole)
            setCookie('token', response.data.token);
            window.localStorage.setItem('userID', response.data.userID);
            window.localStorage.setItem('userRole', response.data.userRole);
            navigate('/');

        } else {
            setFieldError('email', 'Invalid email or password.');
        }
    } catch (error) {
        console.error('Login error:', error);
    }
    setSubmitting(false);
};

const SignInFormBody = ({ isSubmitting }) => (
    <Form style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
    }}>
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '5px'
            }} />
            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '5px'
            }} />
            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" disabled={isSubmitting} style={{
                backgroundColor: '#007BFF',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px'
            }}>
                Sign In
            </button>
        </div>
    </Form>
);

export const SignIn = () => {

    UseRedirect();

    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers, setCookie, navigate)}
        >
            {props => <SignInFormBody {...props} />}
        </Formik>
    );
};
