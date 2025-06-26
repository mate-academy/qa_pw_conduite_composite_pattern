import { test } from '../../_fixtures/fixtures';

test(`Update user with bio and image`, async ({
  registeredUser,
  usersApi,
  testDataDirector,
}) => {
  const newProfile =
    testDataDirector.profile.extendWithBioAndImage(registeredUser);
  const response = await usersApi.updateUser(newProfile);

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertUsernameHasCorrectValue(response, newProfile.username);
  await usersApi.assertEmailHasCorrectValue(response, newProfile.email);
  await usersApi.assertResponseBodyContainsToken(response);
  await usersApi.assertBioHasCorrectValue(response, newProfile.bio);
  await usersApi.assertImageHasCorrectValue(response, newProfile.image);
});
