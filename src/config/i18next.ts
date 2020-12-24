import i18next from 'i18next';
import backend from 'i18next-xhr-backend';
import {APP_PREFIX} from './properties';

i18next
    .use(backend)
    // .use(reactI18nextModule)
    .init({
        ns: ['enums'],
        interpolation: {escapeValue: false},  // React already does escaping
        lng: 'vi',                              // language to use
        fallbackLng: 'en',
        whitelist: ['vi', 'en'],
        backend: {
            loadPath: `${APP_PREFIX}/i18n/{{lng}}/{{ns}}.json`,
        }
    });
