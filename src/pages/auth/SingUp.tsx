import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Required'),
    email: Yup.string()
        .email('Please enter a valid email')
        .test('email-exists', 'Email already exists', async (value) => {
            try {
                const response = await axios.get(`http://localhost:5004/users/get-user-email/${value}`);
                return !response.data.emailExists;
            } catch (error) {
                return true;
            }
        })
        .required('Required'),
    familyName: Yup.string().required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Required'),
});


export const SingUp = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            familyName: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...dataToSend } = values;

            try {
                await axios.post('http://localhost:5004/auth/register', dataToSend);
                alert('User created successfully');
            } catch (error) {
                console.error('Error signing up:', error);
            }
        },
        validationSchema: SignUpSchema // Use Yup validation schema directly
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100 vh', backgroundColor: '#E0E5EC' }}>
            <form style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
            }}
                  onSubmit={formik.handleSubmit}>
                <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    SignUp form
                </p>
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    type="text"
                    placeholder="Name"
                    {...formik.getFieldProps('username')}
                />
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                />
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    type="text"
                    placeholder="Family Name"
                    {...formik.getFieldProps('familyName')}
                />
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    placeholder="Password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    placeholder="Confirm Password"
                    type="password"
                    {...formik.getFieldProps('confirmPassword')}
                />
                <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#D53F8C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                        type="submit">
                    SingUp
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <p style={{ marginRight: '10px' }}>Already registered?</p>
                    {/*<Link to="/auth/signIn" style={{ color: '#059669' }}>SignIn</Link>*/}
                </div>
            </form>
        </div>
    );
}


