export const rules = {
  'class-names-order': require('./rules/class-names-order').default,
  'duplicated-class-names': require('./rules/duplicated-class-names').default,
};

export const configs = {
  recommended: require('./configs/recommended').default,
};
