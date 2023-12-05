import * as yup from 'yup';

const getModalSchema = (array) => {
    const schema = yup.object().shape({
        name: yup.string().notOneOf(array, 'Должно быть уникальным').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').trim(),
    });

    return schema;
}

const loginSchema = yup.object().shape({
    username: yup.string(),
});

const signupSchema = yup.object().shape({
    username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').trim(),
    password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string().required('Пароли должны совпадать')
     .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});

export { loginSchema, getModalSchema, signupSchema };
    
