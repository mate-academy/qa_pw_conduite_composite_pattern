import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe('Add comments API suite', () => {

  test.use({ usersNumber: 2 });
  let article;

  test.beforeEach(async ({
    registeredUsers, articlesApi, articleWithOneTag  }) => {

    article = articleWithOneTag;
    const response = await articlesApi.createArticle(
      article,
      registeredUsers[0].token,
    );
    await articlesApi.assertSuccessResponseCode(response);
    article['slug'] = await articlesApi.parseSlugFromResponse(response);
  })


  test('Create new comment without auth token', async ({
    commentsApi,
    registeredUsers,
  }) => {

    registeredUsers[1].token = '';

    const myComment = faker.lorem.sentence();
    const response = await commentsApi.createComment(
      myComment,
      article,
      registeredUsers[1].token,
    );

    await commentsApi.comments.assertUnauthorizedResponseCode(response);

  });

  test('Create new comment to the article created by another user', async ({
    commentsApi,
    registeredUsers,
  }) => {

    const myComment = faker.lorem.sentence();
    const response = await commentsApi.createComment(
      myComment,
      article,
      registeredUsers[1].token,
    );

    await commentsApi.assertSuccessResponseCode(response);

  });

  test('Create new comment without body field', async ({
    commentsApi,
    registeredUsers,
  }) => {

    const response = await commentsApi.createComment(
      null,
      article,
      registeredUsers[1].token,
    )

    await commentsApi.comments.assertUnprocessableEntityResponseCode(
      response
    );

  });

})
