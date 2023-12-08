import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'Обязательное поле',
      },
    string: {
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
        oneOf: 'Пароли должны совпадать',
        notOneOf: 'Должно быть уникальным',
    },
  });

const getModalSchema = (array) => {
    const schema = yup.object().shape({
        name: yup.string().notOneOf(array).min(3).max(20).trim(),
    });
    return schema;
};

const loginSchema = yup.object().shape({
    username: yup.string(),
});

const signupSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20).trim(),
    password: yup.string().required().test(
        'passwordLength', "Не менее 6 символов", value => value < 6
    ),
    confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null])
     .required()
});

export { loginSchema, getModalSchema, signupSchema };
    
