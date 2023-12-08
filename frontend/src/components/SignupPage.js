import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { signupSchema } from '../schemas/index.js';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import routes from '../routes.js';
import useAuth from '../hooks/index.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getInputClass = (error, touched, authFailed) => cn('form-control', {
    'is-invalid': ((error && touched) || authFailed)
  });

const getConfirmPasswordInputClass = (error, touched, password, authFailed) => cn('form-control', {
    'is-invalid': ((error && touched && password !== '') || authFailed)
  });


const SignupPage = () => {
    const { t } = useTranslation();

    const auth = useAuth();
    const [authFailed, setAuthFailed] = useState(false);
    const navigate = useNavigate();
    const inputEl = useRef();
    useEffect(() => {
      inputEl.current.focus();
    }, []);

    const { values, errors, touched, handleBlur,handleChange, handleSubmit, setSubmitting } = useFormik({
        initialValues: { username: '', password: '', confirmPassword: '' },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            try {
              const res = await axios.post(routes.signupPath(), values);
              localStorage.setItem('userId', JSON.stringify(res.data));
              auth.logIn();
              navigate('/');
            } catch (err) {
              setSubmitting(false);
              if (err.isAxiosError && err.response.status === 409) {
                setAuthFailed(true);
                errors.confirmPassword = 'thisUserExist'
                return;
              }
              throw err;
            }
          },
    });

    return (
        <div className='container-fluid h-100'>
        <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
            <div className='card shadow-sm'>
                <div className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
                    <div>
                        <img src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg" className='rounded-circle' alt="Регистрация"/>
                    </div>
                    <form className="w-50" onSubmit={handleSubmit}>
                        <h1 className='text-center mb-4'>{t('registration')}</h1>
                        <div className='form-floating mb-3'>
                            <input
                            ref={inputEl}
                            name="username"
                            autoComplete='username'
                            required
                            placeholder='От 3 до 20 символов'
                            id="username"
                            className={getInputClass(errors.username, touched.username, authFailed)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            />
                            <div className="invalid-tooltip">{errors.username}</div>
                            <label className='form-label' htmlFor="username">{t('username')}</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                            name="password"
                            autoComplete='new-password'
                            required
                            placeholder='Не менее 6 символов'
                            id="password"
                            className={getInputClass(errors.password, touched.password, authFailed)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            />
                            <div className="invalid-tooltip">{errors.password}</div>
                            <label className='form-label' htmlFor="password">{t('password')}</label>
                        </div>
                        <div className='form-floating mb-4'>
                            <input
                            name="confirmPassword"
                            autoComplete='new-password'
                            required
                            placeholder='Пароли должны совпадать'
                            id="confirmPassword"
                            className={getConfirmPasswordInputClass(errors.confirmPassword, touched.confirmPassword, values.password, authFailed)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            />
                            <div className="invalid-tooltip">
                                {errors.confirmPassword}
                            </div>
                            <label className='form-label' htmlFor="password">{t('confirmPassword')}</label>
                        </div>
                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('buttons.signup')}</button>
                    </form>
                </div>
            </div>
            
        </div>
        </div>
        </div>
    )
};

export default SignupPage;