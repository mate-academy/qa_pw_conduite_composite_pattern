import { test } from '../../_fixtures/fixtures';

test.describe('Create comment without body field', () => {
  test.use({ usersNumber: 2 });

  let slug: string;
  let commenter;

  test.beforeEach(async ({ api, registeredUsers }) => {
    const [author, user] = registeredUsers;

    commenter = user;

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

  test('Create new comment without body field', async ({ api }) => {
    const response = await api.createComment(slug, {}, commenter.token);

    await api.comments.assertUnprocessableEntityResponseCode(response);
    await api.comments.assertErrorMessageInResponseBody(
      response,
      "body:can't be blank",
      'body',
    );
  });
});
