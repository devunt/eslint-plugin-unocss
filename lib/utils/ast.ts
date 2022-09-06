// type Node = (string | Node)[];

export class ASTNode extends Map<string, ASTNode | undefined> {}

export const generateTokenAST = (tokens: string[]) => {
  const ast = new ASTNode();

  for (const token of tokens) {
    const parts = token.split(':');

    const handle = (node: ASTNode, parts: string[]) => {
      const [part, ...rest] = parts;

      if (rest.length === 0) {
        node.set(part, undefined);
      } else {
        const child = node.get(part) || new ASTNode();
        node.set(part, child);
        handle(child, rest);
      }
    };

    handle(ast, parts);
  }

  return ast;
};

export const generateClassNameFromAST = (ast: ASTNode, nested: boolean = false): string => {
  const classNames: string[] = [];

  for (const [key, value] of ast.entries()) {
    if (value) {
      classNames.push(`${key}:${generateClassNameFromAST(value, true)}`);
    } else {
      classNames.push(key);
    }
  }

  if (classNames.length === 1) {
    return classNames[0];
  } else {
    const className = classNames.join(' ');
    if (nested) {
      return `(${className})`;
    } else {
      return className;
    }
  }
};
