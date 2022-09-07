import { ESLintUtils } from '@typescript-eslint/utils';

import { sanitizeClassName } from '../utils/classname';
import { traverseClassName } from '../utils/traverse';

export default ESLintUtils.RuleCreator((name) => name)({
  name: 'no-excessive-whitespaces',
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'Find excessive whitespaces in classnames',
      recommended: false,
    },
    messages: {
      'excessive-whitespaces': 'excessive whitespaces in classnames',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return traverseClassName({
      rule: 'no-excessive-whitespaces',
      visitor: (node, className) => {
        const sanitizedClassName = sanitizeClassName(className);
        if (className !== sanitizedClassName) {
          context.report({
            node,
            messageId: 'excessive-whitespaces',
            fix: (fixer) => fixer.replaceText(node, `'${sanitizedClassName}'`),
          });

          return false;
        }

        return true;
      },
    });
  },
});
