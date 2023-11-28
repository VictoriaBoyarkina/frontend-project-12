import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
});

export default schema;
    
