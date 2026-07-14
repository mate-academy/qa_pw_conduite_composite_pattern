import { test } from '../../_fixtures/fixtures';

test(`Create article with empty body`, async ({
  registeredUser,
  api,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;
  article['body'] = null;

  const response = await api.articles.createArticle(
    article,
    registeredUser.token,
  );

  await api.articles.assertUnprocessableEntityResponseCode(response);
});
