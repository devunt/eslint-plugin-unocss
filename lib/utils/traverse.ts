import { TSESTree } from '@typescript-eslint/utils';
import { RuleListener } from '@typescript-eslint/utils/dist/ts-eslint';

import { hash } from './hash';

const traversedClassNameHashes = new Set<string>();

type TraverseClassNameArgs = {
  rule: string;
  visitor: (node: TSESTree.Node, className: string) => boolean;
};

type TraverseClassName = (args: TraverseClassNameArgs) => RuleListener;

export const traverseClassName: TraverseClassName = ({ rule, visitor }) => {
  return {
    JSXAttribute: async (node) => {
      const {
        name: { name },
        value,
      } = node;

      if (name !== 'className' || !value) {
        return;
      }

      if (value.type === 'Literal') {
        const { value: className } = value;

        if (typeof className !== 'string') {
          return;
        }

        const hashedClassName = hash(`${rule}:${className}`);
        if (!traversedClassNameHashes.has(hashedClassName)) {
          if (visitor(value, className)) {
            traversedClassNameHashes.add(hashedClassName);
          }
        }
      }
    },
  };
};
