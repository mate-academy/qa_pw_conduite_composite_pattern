import { test } from '../../_fixtures/fixtures';

test(`Update user profile with new all new fields`, async ({
  registeredUser,
  usersApi,
  testDataDirector,
}) => {
  const newProfile = testDataDirector.profile.buildNewProfile(
    registeredUser.token,
  );
  const response = await usersApi.updateUser(newProfile);

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertUsernameHasCorrectValue(response, newProfile.username);
  await usersApi.assertEmailHasCorrectValue(response, newProfile.email);
  await usersApi.assertResponseBodyContainsToken(response);
  await usersApi.assertBioHasCorrectValue(response, newProfile.bio);
  await usersApi.assertImageHasCorrectValue(response, newProfile.image);
});
