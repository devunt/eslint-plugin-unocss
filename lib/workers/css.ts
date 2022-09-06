import { loadConfig } from '@unocss/config';
import { createGenerator, expandVariantGroup } from '@unocss/core';
import { runAsWorker } from 'synckit';

runAsWorker(async (className: string) => {
  const { config } = await loadConfig();

  const generator = createGenerator(config);

  const expanded = expandVariantGroup(className);
  const { css } = await generator.generate(expanded, { preflights: false });

  return css;
});
