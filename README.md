# ESLint plugin for UnoCSS

This is a proof of concept ESLint plugin for [UnoCSS](https://github.com/unocss/unocss).

**Not ready for production use yet**

## Installation

```bash
$ pnpm add -D eslint-plugin-unocss
```

## Configuration

Use our preset to get reasonable defaults:

```yaml
extends:
  - plugin:unocss/recommended
```

## Exported rules

- `unocss/classnames-order` - Enforce a specific order for class names in your code.
- `unocss/no-duplicated-classnames` - Disallow duplicate class names in your code.
- `unocss/no-excessive-whitespaces` - Disallow excessive whitespaces in your code.
