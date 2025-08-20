import { test, expect } from '../fixtures/api-fixture';

test.describe('Comments API', () => {
  let user1, user2, articleSlug, commentId;

  test.beforeAll(async ({ api }) => {
    // створюємо двох користувачів
    user1 = await api.users.registerRandomUser();
    user2 = await api.users.registerRandomUser();

    // логін user1 і створення статті
    const loginResp = await api.users.loginUser({
      email: user1.email,
      password: user1.password,
    });
    const token1 = (await loginResp.json()).user.token;

    const articleResp = await api.articles.createArticle(
      { title: 'Test Article', description: 'desc', body: 'body' },
      token1,
    );
    const articleJson = await articleResp.json();

    articleSlug = articleJson.article.slug;
  });

  test('Create new comment to the article created by another user', async ({
    api,
  }) => {
    const loginResp = await api.users.loginUser({
      email: user2.email,
      password: user2.password,
    });
    const token2 = (await loginResp.json()).user.token;

    const resp = await api.comments.createComment(
      articleSlug,
      'Nice article!',
      token2,
    );
    expect(resp.status()).toBe(200);

    const json = await resp.json();
    expect(json.comment.body).toBe('Nice article!');

    commentId = json.comment.id;
  });

  test('Create new comment without auth token', async ({ api }) => {
    const resp = await api.comments.createComment(
      articleSlug,
      'Unauthorized comment',
    );
    expect(resp.status()).toBe(401);
  });

  test('Create new comment without body field', async ({ api }) => {
    const loginResp = await api.users.loginUser({
      email: user2.email,
      password: user2.password,
    });
    const token2 = (await loginResp.json()).user.token;

    const resp = await api.comments.createComment(
      articleSlug,
      undefined,
      token2,
    );
    expect(resp.status()).toBe(422);
  });

  test('Delete comment added by the same user', async ({ api }) => {
    const loginResp = await api.users.loginUser({
      email: user2.email,
      password: user2.password,
    });
    const token2 = (await loginResp.json()).user.token;

    const resp = await api.comments.deleteComment(
      articleSlug,
      commentId,
      token2,
    );
    expect(resp.status()).toBe(204);
  });

  test('Delete comment added by the another user', async ({ api }) => {
    // user1 додає новий комент
    const loginResp1 = await api.users.loginUser({
      email: user1.email,
      password: user1.password,
    });
    const token1 = (await loginResp1.json()).user.token;

    const commentResp = await api.comments.createComment(
      articleSlug,
      'User1 comment',
      token1,
    );
    const newCommentId = (await commentResp.json()).comment.id;

    // user2 пробує видалити
    const loginResp2 = await api.users.loginUser({
      email: user2.email,
      password: user2.password,
    });
    const token2 = (await loginResp2.json()).user.token;

    const resp = await api.comments.deleteComment(
      articleSlug,
      newCommentId,
      token2,
    );
    expect(resp.status()).toBe(403);
  });
});
