import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
    name: yup.string().notOneOf().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').trim(),
});

export default schema;
    
