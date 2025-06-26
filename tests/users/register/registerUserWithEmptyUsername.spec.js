import { test } from '../../_fixtures/fixtures';
import { EMPTY_USERNAME_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Register user with empty username', async ({ user, usersApi }) => {
  const response = await usersApi.registerNewUser({
    email: user.email,
    password: user.password,
    username: '',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_USERNAME_MESSAGE,
    'username',
  );
});
