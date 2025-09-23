import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { FORBIDDEN, NO_CONTENT } from '../../../src/constants/responceCodes';

test.use({ usersNumber: 2 });

test.describe('Delete comments API suite', () => {
  let article;

  test.beforeEach(async ({
    registeredUsers, articlesApi, articleWithOneTag }) => {

    article = articleWithOneTag;
    const response = await articlesApi.createArticle(
      article,
      registeredUsers[0].token,
    );
    await articlesApi.assertSuccessResponseCode(response);
    article['slug'] = await articlesApi.parseSlugFromResponse(response);
  })


  test('Delete comment added by the same user', async ({
    commentsApi,
    registeredUsers,
  }) => {

    const myComment = faker.lorem.sentence();
    const createCommentResponse = await commentsApi.createComment(
      myComment,
      article,
      registeredUsers[1].token,
    );
    commentsApi.comments.assertSuccessResponseCode(createCommentResponse);

    const responseDelete = await commentsApi.deleteComment(
      createCommentResponse,
      article,
      registeredUsers[1].token,
    );
    await commentsApi.comments.assertResponseCode(responseDelete, NO_CONTENT);

  });

  test('Delete comment added by the another user', async ({
    commentsApi,
    registeredUsers,
  }) => {


    const myComment = faker.lorem.sentence();
    const createCommentResponse = await commentsApi.createComment(
      myComment,
      article,
      registeredUsers[0].token,
    );
    commentsApi.comments.assertSuccessResponseCode(createCommentResponse);

    const responseDelete = await commentsApi.deleteComment(
      createCommentResponse,
      article,
      registeredUsers[1].token,
    );
    await commentsApi.comments.assertResponseCode(responseDelete, FORBIDDEN);
  });

})
