import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import { loginSchema } from '../schemas/index.js';
import login from '../images/login.jpg';

const getInputClass = (error, touched, authFailed) => cn('form-control', {
  'is-invalid': (error && touched) || authFailed,
});

const LoginPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const invalidCredentials = () => {
    if (authFailed) {
      return (
        <div className="invalid-tooltip">
          {t('errors.invalidCredentials')}
        </div>
      );
    }
    return null;
  };

  const {
    values, errors, touched, handleBlur, handleChange, handleSubmit, setSubmitting,
  } = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async () => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/', { state: { from: location } });
      } catch (err) {
        console.log(err.message);
        setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputEl.current.select();
          return;
        }
        if (err.message === 'Network Error') {
          toast.error(t('toast.networkError'), {
            autoClose: 5000,
          });
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="cardbody row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={login}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={handleSubmit}
              >
                <h1 className="text-center mb-4">
                  {t('buttons.login')}
                </h1>
                <div className="form-floating mb-3">
                  <input
                    ref={inputEl}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className={getInputClass(errors.username, touched.username, authFailed)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <label htmlFor="username">
                    {t('nickname')}
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="password"
                    className={getInputClass(errors.password, touched.password, authFailed)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <label htmlFor="password">
                    {t('password')}
                  </label>
                  {invalidCredentials()}
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  {t('buttons.login')}
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('noAccount')}
                  {' '}
                </span>
                <a href="/signup">
                  {t('registration')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
