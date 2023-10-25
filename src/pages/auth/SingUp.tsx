import { useFormik } from 'formik';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {SignUpSchema} from "../../schema";

export const validateEmail = debounce(async (value) => {
    try {
        const response = await axios.get(`http://localhost:5004/users/get-user-email/${value}`);
        return !response.data.emailExists;  // Return true if email doesn't exist, false otherwise
    } catch (error) {
        console.error('Error checking email:', error);
        return false;  // Treat any API error as validation failure
    }
}, 300);



export const SingUp = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            familyName: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values,validationError) => {

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...dataToSend } = values;
            try {
                await axios.post('http://localhost:5004/auth/register', dataToSend);
                alert('User created successfully');
            } catch (error) {
                console.error('Error signing up:', error.response.data.error);
                validationError.error = error
            }
        },
        validationSchema: SignUpSchema,
    });
    console.log('My error here:',formik.errors)

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
                    {formik.touched.username && formik.errors.username ? formik.errors.username : null}

                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                />
                    {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    type="text"
                    placeholder="Family Name"
                    {...formik.getFieldProps('familyName')}
                />

                {formik.touched.familyName && formik.errors.familyName ? formik.errors.familyName : null}
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    placeholder="Password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #D1D5DB' }}
                    placeholder="Confirm Password"
                    type="password"
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
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
                {/*{formik.validationError.error !== '' ? 'error' : 'no error'}*/}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <p style={{ marginRight: '10px' }}>Already registered?</p>
                    {/*<Link to="/auth/signIn" style={{ color: '#059669' }}>SignIn</Link>*/}
                </div>
            </form>
        </div>
    );
}


