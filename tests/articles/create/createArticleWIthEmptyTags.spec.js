import { test } from '../../_fixtures/fixtures';

test(`Create article with empty tags`, async ({
  registeredUser,
  api,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;
  const response = await api.articles.createArticle(
    article,
    registeredUser.token,
  );

  await api.articles.assertSuccessResponseCode(response);
  await api.articles.assertResponseBodyContainsSlug(response);
  await api.articles.assertArticleTitleHasCorrectValue(response, article.title);
  await api.articles.assertArticleDescriptionHasCorrectValue(
    response,
    article.description,
  );
  await api.articles.assertArticleBodyHasCorrectValue(response, article.body);
  await api.articles.assertArticleTagsHasCorrectValue(response, article.tagList);
});
