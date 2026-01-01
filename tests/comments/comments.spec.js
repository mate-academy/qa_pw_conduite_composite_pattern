import { test } from '../_fixtures/fixtures';

test.describe('Comments API', () => {
  test('Create new comment to article created by another user', async ({
    registeredUser,
    secondRegisteredUser,
    articlesApi,
    commentsApi,
    articleWithoutTags,
  }) => {
    const articleResponse = await articlesApi.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );

    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const response = await commentsApi.createComment(
      slug,
      { body: 'My comment' },
      secondRegisteredUser.token,
    );

    await commentsApi.assertSuccessResponseCode(response);
  });

  test('Create new comment without auth token should fail', async ({
    registeredUser,
    articlesApi,
    commentsApi,
    articleWithoutTags,
  }) => {
    const articleResponse = await articlesApi.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );

    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const response = await commentsApi.createComment(
      slug,
      { body: 'Unauthorized comment' },
      null,
    );

    await commentsApi.assertUnauthorizedResponseCode(response);
  });

  test('Create new comment without body should fail', async ({
    registeredUser,
    secondRegisteredUser,
    articlesApi,
    commentsApi,
    articleWithoutTags,
  }) => {
    const articleResponse = await articlesApi.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );

    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const response = await commentsApi.createComment(
      slug,
      {},
      secondRegisteredUser.token,
    );

    await commentsApi.assertUnprocessableEntityResponseCode(response);
  });

  test('Delete comment added by the same user', async ({
    registeredUser,
    secondRegisteredUser,
    articlesApi,
    commentsApi,
    articleWithoutTags,
  }) => {
    const articleResponse = await articlesApi.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );

    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const commentResponse = await commentsApi.createComment(
      slug,
      { body: 'Comment to delete' },
      secondRegisteredUser.token,
    );

    const commentBody = await commentResponse.json();
    const commentId = commentBody.comment.id;

    const deleteResponse = await commentsApi.deleteComment(
      slug,
      commentId,
      secondRegisteredUser.token,
    );

    await commentsApi.assertSuccessResponseCode(deleteResponse);
  });

  test('Delete comment added by another user should fail', async ({
    registeredUser,
    secondRegisteredUser,
    articlesApi,
    commentsApi,
    articleWithoutTags,
  }) => {
    const articleResponse = await articlesApi.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );

    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const commentResponse = await commentsApi.createComment(
      slug,
      { body: 'Comment by user1' },
      registeredUser.token,
    );

    const commentBody = await commentResponse.json();
    const commentId = commentBody.comment.id;

    const deleteResponse = await commentsApi.deleteComment(
      slug,
      commentId,
      secondRegisteredUser.token,
    );

    await commentsApi.assertForbiddenResponseCode(deleteResponse);
  });
});
