import { test as base } from '@playwright/test';
import { TestDataDirector } from '../../src/common/testData/builders/TestDataDirector';

export const test = base.extend<{
  testDataDirector;
  user;
  users;
  newUserProfile;
}>({
  testDataDirector: async ({}, use) => {
    const director = new TestDataDirector();

    await use(director);
  },
  user: async ({ testDataDirector }, use) => {
    const user = testDataDirector.user.buildUser();

    await use(user);
  },
  users: async ({ testDataDirector, usersNumber }, use) => {
    const users = Array(usersNumber);

    for (let i = 0; i < usersNumber; i++) {
      users[i] = testDataDirector.user.buildUser();
    }

    await use(users);
  },
  newUserProfile: async ({ testDataDirector }, use) => {
    const profile = testDataDirector.userProfile.buildNewUserProfile();

    await use(profile);
  },
});
