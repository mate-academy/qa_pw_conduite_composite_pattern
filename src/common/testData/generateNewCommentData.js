import { faker } from '@faker-js/faker';

export function generateNewCommentData() {
  return {
    body: faker.lorem.sentence(),
  };
}
