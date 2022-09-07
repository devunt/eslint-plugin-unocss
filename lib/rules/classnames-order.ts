import { ESLintUtils } from '@typescript-eslint/utils';
import { expandVariantGroup } from '@unocss/core';
import { createSyncFn } from 'synckit';

import { generateClassNameFromAST, generateTokenAST } from '../utils/ast';
import { sanitizeClassName } from '../utils/classname';
import { traverseClassName } from '../utils/traverse';

const pattern = / *\.(?<selector>\S+?)\{/;
const generateCSS = createSyncFn<(className: string) => Promise<string>>(require.resolve('../workers/css'));

export default ESLintUtils.RuleCreator((name) => name)({
  name: 'classnames-order',
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: {
      description: 'Order',
      recommended: false,
    },
    messages: {
      'invalid-order': 'Class names are not ordered',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return traverseClassName({
      rule: 'classnames-order',
      visitor: (node, className) => {
        const sanitizedClassName = sanitizeClassName(className);

        const expandedClassName = expandVariantGroup(sanitizedClassName);
        const css = generateCSS(expandedClassName);

        const classNames = expandedClassName.split(' ');
        const orderedClassNames = css
          .split(/\n/)
          .filter((v) => v.startsWith('.'))
          .map((v) => v.match(pattern)?.groups?.selector?.replace(/\\/g, ''))
          .filter(Boolean);

        classNames.sort((a, z) => {
          const aIdx = orderedClassNames.indexOf(a);
          const zIdx = orderedClassNames.indexOf(z);

          if (aIdx === zIdx) return a.localeCompare(z);
          if (aIdx === -1) return 1;
          if (zIdx === -1) return -1;

          return aIdx - zIdx;
        });

        const ast = generateTokenAST(classNames);
        const orderedClassName = generateClassNameFromAST(ast);

        if (sanitizedClassName !== orderedClassName) {
          context.report({
            node,
            messageId: 'invalid-order',
            fix: (fixer) => fixer.replaceText(node, `'${orderedClassName}'`),
          });

          return false;
        }

        return true;
      },
    });
  },
});
