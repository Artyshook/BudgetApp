import axios from "axios";
// import {useState} from "react";
// import {SubmitHandler, useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// const FormSchema = z
//     .object({
//         username: z
//             .string()
//             .min(3, { message: 'Name must be at least 3 characters long' }),
//         email: z
//             .string()
//             .email({ message: 'Please enter a valid email' })
//             .refine(
//                 async (email) => {
//                     try {
//                         const response = await axios.get(
//                             `http://localhost:5004/users/get-user-email/${email}`
//                         );
//                         const { emailExists } = response.data;
//                         return !emailExists; // Return true if email doesn't exist, false otherwise
//                     } catch (error) {
//                         return true; // Assuming an error means the email doesn't exist
//                     }
//                 },
//                 { message: 'Email already exists' }
//             ),
//         familyName: z.string(),
//         password: z
//             .string()
//             .min(6, { message: 'Password must be at least 6 characters long' }),
//         confirmPassword: z.string(),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//         message: 'Passwords do not match',
//         path: ['confirmPassword'],
//     });
//
// type FormSchemaType = z.infer<typeof FormSchema>;

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

export const SignUp = () => {
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                familyName: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                    await axios.post('http://localhost:1000/auth/signup', values);
                    alert('User created successfully');
                } catch (error) {
                    setErrors({ email: error.response.data.message });
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="auth">
                    <div>
                        <p className="my-5 text-center text-lg">SignUp form</p>
                        <Field className="auth-input" type="text" name="username" placeholder="Name" />
                        <ErrorMessage name="username" component="p" className="auth-error" />

                        <Field className="auth-input" type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="p" className="auth-error" />

                        <Field className="auth-input" type="text" name="familyName" placeholder="Family Name" />
                        <ErrorMessage name="familyName" component="p" className="auth-error" />

                        <Field className="auth-input" type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="p" className="auth-error" />

                        <Field className="auth-input" type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <ErrorMessage name="confirmPassword" component="p" className="auth-error" />

                        <button className="auth-button" type="submit" disabled={isSubmitting}>
                            SignUp
                        </button>
                        <div className="flex flex-row justify-center">
                            <p className="mr-2">Already registered?</p>
                            <p className="text-green-700 hover:text-green-800 cursor-pointer">
                                {/*<Link to="/auth/signIn">SignIn</Link>*/}
                            </p>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

// export const SingUp = () => {
//
//     const [error, setError] = useState('');
//
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm<FormSchemaType>({
//         resolver: zodResolver(FormSchema),
//     });
//
//     const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
//         try {
//             await axios.post('http://localhost:1000/auth/signup', data);
//             alert('User created successfully');
//             setError('');
//         } catch (error: unknown) {
//             setError(error.response.data.message);
//         }
//     };
//
//     return (
//         <>
//             <form className="auth" onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <p className="my-5 text-center text-lg">SignUp form</p>
//                     <input
//                         className="auth-input"
//                         type="text"
//                         placeholder="Name"
//                         {...register('username')}
//                     />
//                     {errors.username && (
//                         <p className="auth-error">{errors.username.message}</p>
//                     )}
//                     <input
//                         className="auth-input"
//                         placeholder="Emial"
//                         {...register('email')}
//                     />
//                     <input
//                         className="auth-input"
//                         type="text"
//                         placeholder="Family Name"
//                         {...register('familyName')}
//                     />
//                     {errors.email && <p className="auth-error">{errors.email.message}</p>}
//                     <input
//                         className="auth-input"
//                         placeholder="Password"
//                         {...register('password')}
//                     />
//                     {errors.password && (
//                         <p className="auth-error">{errors.password.message}</p>
//                     )}
//                     <input
//                         className="auth-input"
//                         placeholder="Confirm Password"
//                         {...register('confirmPassword')}
//                     />
//                     {errors.confirmPassword && (
//                         <p className="auth-error mb-5">{errors.confirmPassword.message}</p>
//                     )}
//                     {error && <p className="auth-error mb-5">{error}</p>}
//                     <button className="auth-button type:submit" disabled={isSubmitting}>
//                         SingUp
//                     </button>
//                     <div className="flex flex-row justify-center">
//                         <p className="mr-2">Already registered?</p>
//                         <p className="text-green-700 hover:text-green-800 cursor-pointer">
//                             <Link to="/auth/signIn">SignIn</Link>
//                         </p>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
//
// }