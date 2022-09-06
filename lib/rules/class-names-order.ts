import { ESLintUtils } from '@typescript-eslint/utils';
import { expandVariantGroup } from '@unocss/core';
import { createSyncFn } from 'synckit';

import { generateClassNameFromAST, generateTokenAST } from '../utils/ast';
import { traverseClassName } from '../utils/traverse';

const pattern = / *\.(?<selector>\S+?)\{/;
const generateCSS = createSyncFn<(className: string) => Promise<string>>(require.resolve('../workers/css'));

export default ESLintUtils.RuleCreator((name) => name)({
  name: 'class-names-order',
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: {
      description: 'Order',
      recommended: false,
    },
    messages: {
      invalidOrder: 'Class names are not ordered',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return traverseClassName({
      visitor: async (node, className) => {
        const expandedClassName = expandVariantGroup(className);
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

        if (className !== orderedClassName) {
          context.report({
            node,
            messageId: 'invalidOrder',
            fix: (fixer) => fixer.replaceText(node, `'${orderedClassName}'`),
          });
        }
      },
    });
  },
});
