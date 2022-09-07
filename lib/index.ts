export const rules = {
  'classnames-order': require('./rules/classnames-order').default,
  'no-duplicated-classnames': require('./rules/no-duplicated-classnames').default,
  'no-excessive-whitespaces': require('./rules/no-excessive-whitespaces').default,
};

export const configs = {
  recommended: require('./configs/recommended').default,
};
