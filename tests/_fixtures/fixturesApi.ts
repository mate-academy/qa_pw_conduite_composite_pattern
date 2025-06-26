import { test as base } from '@playwright/test';
import { ApiComposite } from '../../src/api/ApiComposite';
import { ApiClientFacade } from '../../src/api/ApiClientFacade';

export const test = base.extend<{
  api;
}>({
  api: async ({ request, logger }, use) => {
    const apiClientFacade = new ApiClientFacade({ request, logger });
    const client = new ApiComposite(apiClientFacade);

    await use(client);
  },
});
