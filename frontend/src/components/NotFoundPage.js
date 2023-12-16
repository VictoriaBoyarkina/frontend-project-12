import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="logo404 text-muted">
        {t('errors.error404')}
      </h1>
      <h1 className="h4 text-muted">
        {t('errors.pageNotFound')}
      </h1>
      <p className="text-muted">
        <span>
          {t('butYouCan')}
          {' '}
        </span>
        <a href="/login">
          {t('toTheMainPage')}
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;
