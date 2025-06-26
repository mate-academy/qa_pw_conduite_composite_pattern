import { test as base } from '@playwright/test';
import { ProfilesApi } from '../../src/api/resources/ProfilesApi';

export const test = base.extend<{
  profilesApi;
}>({
  profilesApi: async ({ request }, use) => {
    const client = new ProfilesApi(request);

    await use(client);
  },
});
