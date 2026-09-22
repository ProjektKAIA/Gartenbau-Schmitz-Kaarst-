import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** Flat-Config: `eslint-config-next` exportiert seit v15.3 fertige Flat-Arrays. */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Referenzmaterial (Original-Entwürfe, Spiegel der Altseite) wird nicht gelintet.
    ignores: ['entwuerfe/**', 'altseite/**'],
  },
];

export default config;
