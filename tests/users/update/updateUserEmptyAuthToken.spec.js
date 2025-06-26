import { test } from '../../_fixtures/fixtures';

test(`Update user with empty auth token`, async ({
  registeredUser,
  usersApi,
  testDataDirector,
}) => {
  const newProfile =
    testDataDirector.profile.extendWithEmptyToken(registeredUser);

  const response = await usersApi.updateUser(newProfile);

  await usersApi.assertUnauthorizedResponseCode(response);
});
