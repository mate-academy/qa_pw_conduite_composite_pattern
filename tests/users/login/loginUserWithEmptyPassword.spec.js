import { test } from '../../_fixtures/fixtures';
import { EMPTY_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login user with empty email', async ({ usersApi, registeredUser }) => {
  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: '',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_PASSWORD_MESSAGE,
    'password',
  );
});
