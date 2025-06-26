import { test } from '../../_fixtures/fixtures';

test(`Create article with empty body`, async ({
  registeredUser,
  articlesApi,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;
  article['body'] = null;

  const response = await articlesApi.createArticle(
    article,
    registeredUser.token,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
