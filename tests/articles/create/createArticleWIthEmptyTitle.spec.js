import { test } from '../../_fixtures/fixtures';

test(`Create article with empty title`, async ({
  registeredUser,
  api,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;
  article['title'] = null;

  const response = await api.articles.createArticle(
    article,
    registeredUser.token,
  );

  await api.articles.assertInternalServerErrorResponseCode(response);
});
