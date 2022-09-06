import { TSESTree } from '@typescript-eslint/utils';
import { RuleListener } from '@typescript-eslint/utils/dist/ts-eslint';

type TraverseClassNameArgs = {
  // context: RuleContext;
  visitor: (node: TSESTree.Node, className: string) => void;
};

type TraverseClassName = (args: TraverseClassNameArgs) => RuleListener;

export const traverseClassName: TraverseClassName = ({ visitor }) => {
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

        visitor(value, className);
      }
    },
  };
};
