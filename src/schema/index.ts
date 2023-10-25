import * as Yup from 'yup';
import {validateEmail} from "../pages/auth/SingUp";


export const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Required'),
    familyName: Yup.string().required('Required'),
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Required')
        .test('email-exists', 'Email already exists', async (value) => {
            return await validateEmail(value);
        }),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Required'),
});