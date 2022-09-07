export default {
  plugins: ['unocss'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'unocss/classnames-order': 'warn',
    'unocss/no-duplicated-classnames': 'warn',
    'unocss/no-excessive-whitespaces': 'warn',
  },
};
