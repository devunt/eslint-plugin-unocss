export default {
  plugins: ['unocss'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'unocss/class-names-order': 'warn',
    'unocss/duplicated-class-names': 'warn',
  },
};
