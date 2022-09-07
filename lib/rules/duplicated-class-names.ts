import { ESLintUtils } from '@typescript-eslint/utils';
import { expandVariantGroup } from '@unocss/core';

import { uniq } from '../utils/array';
import { traverseClassName } from '../utils/traverse';

export default ESLintUtils.RuleCreator((name) => name)({
  name: 'duplicated-class-names',
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: {
      description: 'Find duplicated classnames',
      recommended: false,
    },
    messages: {
      classNameDuplicated: 'Class name is duplicated',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return traverseClassName({
      rule: 'duplicated-class-names',
      visitor: async (node, className) => {
        const classNames = expandVariantGroup(className).split(' ');
        const uniqueClassNames = uniq(classNames);

        if (classNames.length !== uniqueClassNames.length) {
          context.report({
            node,
            messageId: 'classNameDuplicated',
          });
        }
      },
    });
  },
});
