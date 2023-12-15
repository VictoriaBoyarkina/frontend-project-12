import 'bootstrap/dist/css/bootstrap.min.css';

const NotFoundPage = () => (
  <div className='text-center'>
    <h1 className='logo404 text-muted'>404</h1>
    <h1 className='h4 text-muted'>Страница не найдена</h1>
    <p className='text-muted'>
      <span>Но вы можете перейти </span>
      <a href="/login">на главную страницу</a>
    </p>
  </div>
);

export default NotFoundPage;
