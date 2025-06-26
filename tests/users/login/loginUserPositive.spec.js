import { test } from '../../_fixtures/fixtures';

test('Successful user login', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: registeredUser.password,
  });

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertResponseBodyContainsToken(response);
});
