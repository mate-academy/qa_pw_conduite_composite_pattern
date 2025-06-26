import { test } from '../../_fixtures/fixtures';

test(`Read profile for not existng user`, async ({ user, profilesApi }) => {
  const response = await profilesApi.getProfile(user.username, user.token);

  await profilesApi.assertNotFoundResponseCode(response);
});
