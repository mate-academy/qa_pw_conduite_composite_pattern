import { test } from '../../_fixtures/fixtures';
import { EMPTY_EMAIL_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login user with empty email', async ({ usersApi, registeredUser }) => {
  const response = await usersApi.loginUser({
    email: '',
    password: registeredUser.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_EMAIL_MESSAGE,
    'email',
  );
});
