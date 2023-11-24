import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

export default schema;
    
