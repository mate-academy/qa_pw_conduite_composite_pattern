import { test } from '../_fixtures';

test.describe('Comments API', () => {
  test('Create comment to article created by another user', async ({
    api,
    registeredUser,
    user,
    articleWithoutTags,
  }) => {
    const articleResponse = await api.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );
    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const anotherUserResponse = await api.registerNewUser(user);
    const anotherUserBody = await anotherUserResponse.json();
    const anotherUserToken = anotherUserBody.user.token;

    const response = await api.createComment(
      slug,
      { body: 'Test comment from another user' },
      anotherUserToken,
    );

    await api.assertSuccessResponseCode(response);
  });

  test('Create comment without auth token', async ({
    api,
    registeredUser,
    articleWithoutTags,
  }) => {
    const articleResponse = await api.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );
    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const response = await api.createComment(slug, {
      body: 'Test comment without token',
    });

    await api.assertUnauthorizedResponseCode(response);
  });

  test('Create comment without body field', async ({
    api,
    registeredUser,
    articleWithoutTags,
  }) => {
    const articleResponse = await api.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );
    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const response = await api.createComment(slug, {}, registeredUser.token);

    await api.assertUnprocessableEntityResponseCode(response);
  });

  test('Delete comment added by the same user', async ({
    api,
    registeredUser,
    articleWithoutTags,
  }) => {
    const articleResponse = await api.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );
    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const createResponse = await api.createComment(
      slug,
      { body: 'Comment to delete' },
      registeredUser.token,
    );
    const commentId =
      await api.comments.parseCommentIdFromResponse(createResponse);

    const deleteResponse = await api.deleteComment(
      slug,
      commentId,
      registeredUser.token,
    );

    await api.assertSuccessResponseCode(deleteResponse);
  });

  test('Delete comment added by another user', async ({
    api,
    registeredUser,
    user,
    articleWithoutTags,
  }) => {
    const articleResponse = await api.createArticle(
      articleWithoutTags,
      registeredUser.token,
    );
    const articleBody = await articleResponse.json();
    const slug = articleBody.article.slug;

    const createResponse = await api.createComment(
      slug,
      { body: 'Comment to delete' },
      registeredUser.token,
    );
    const commentId =
      await api.comments.parseCommentIdFromResponse(createResponse);

    const anotherUserResponse = await api.registerNewUser(user);
    const anotherUserBody = await anotherUserResponse.json();
    const anotherUserToken = anotherUserBody.user.token;

    const deleteResponse = await api.deleteComment(
      slug,
      commentId,
      anotherUserToken,
    );

    await api.assertForbiddenResponseCode(deleteResponse);
  });
});
