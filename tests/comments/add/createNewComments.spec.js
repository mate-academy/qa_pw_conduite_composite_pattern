import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe('Add comments API suite', () => {

  test.use({ usersNumber: 2 });
  let article;

  test.beforeEach(async ({
    registeredUsers, articlesApi, articleWithOneTag  }) => {

    article = articleWithOneTag;
    const responseArticle = await articlesApi.createArticle(
      article,
      registeredUsers[0].token,
    );
    await articlesApi.assertSuccessResponseCode(responseArticle);
    article['slug'] = await articlesApi.parseSlugFromResponse(responseArticle);
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

    article.body = null;
    const myComment = faker.lorem.sentence();
    const response = await commentsApi.createComment(
      myComment,
      article,
      registeredUsers[1].token,
    )

    await commentsApi.assertSuccessResponseCode(response);

  });

})
