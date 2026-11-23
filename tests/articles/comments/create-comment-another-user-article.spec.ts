import { test } from '../../_fixtures/fixtures';

test.describe('Create comment to the article of another user', () => {
  test.use({ usersNumber: 2 });

  let slug: string;
  let author;
  let commenter;

  test.beforeEach(async ({ api, registeredUsers }) => {
    [author, commenter] = registeredUsers;

    const article = {
      title: `Comments test ${Date.now()}`,
      description: 'Article for comments tests',
      body: 'Article body',
      tagList: [],
    };

    const response = await api.createArticle(article, author.token);

    await api.assertSuccessResponseCode(response);
    slug = await api.articles.parseSlugFromResponse(response);
  });

  test('Create new comment to the article created by another user', async ({
    api,
  }) => {
    const text = 'Nice article!';
    const response = await api.createComment(
      slug,
      { body: text },
      commenter.token,
    );

    await api.assertSuccessResponseCode(response);
    await api.comments.assertCommentBodyHasCorrectValue(response, text);
  });
});
