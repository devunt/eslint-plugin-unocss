import { ESLintUtils } from '@typescript-eslint/utils';
import { expandVariantGroup } from '@unocss/core';

import { uniq } from '../utils/array';
import { sanitizeClassName } from '../utils/classname';
import { traverseClassName } from '../utils/traverse';

export default ESLintUtils.RuleCreator((name) => name)({
  name: 'no-duplicated-classnames',
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: {
      description: 'Find duplicated classnames',
      recommended: false,
    },
    messages: {
      'duplicated-classnames': 'Class name is duplicated',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return traverseClassName({
      rule: 'no-duplicated-classnames',
      visitor: (node, className) => {
        const classNames = sanitizeClassName(expandVariantGroup(className)).split(' ');
        const uniqueClassNames = uniq(classNames);

        if (classNames.length !== uniqueClassNames.length) {
          context.report({
            node,
            messageId: 'duplicated-classnames',
          });

          return false;
        }

        return true;
      },
    });
  },
});
