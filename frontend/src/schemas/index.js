import * as yup from 'yup';

const getModalSchema = (array) => {
    const schema = yup.object().shape({
        name: yup.string().notOneOf(array, 'errors.channel.unique').min(3, 'errors.channel.min').max(20, 'errors.channel.max').trim(),
    });
    return schema;
};

const loginSchema = yup.object().shape({
    username: yup.string(),
});

const signupSchema = yup.object().shape({
    username: yup.string().required('errors.required').min(3, 'errors.username.min').max(20, 'errors.username.max').trim(),
    password: yup.string().trim().required('errors.required').min(6, 'errors.password.min'),
    confirmPassword: yup.string().trim()
        .oneOf([yup.ref('password'), null], 'errors.confirmPassword.matchPassword')
        .required('errors.confirmPassword.required')
});

export { loginSchema, getModalSchema, signupSchema };
    
