import { test } from '../../_fixtures/fixtures';

test('Successful user registration', async ({ user, api }) => {
  const response = await api.registerNewUser(user);

  await api.assertSuccessResponseCode(response);
  await api.users.assertUsernameHasCorrectValue(response, user.username);
  await api.users.assertEmailHasCorrectValue(response, user.email);
  await api.users.assertResponseBodyContainsToken(response);
});
