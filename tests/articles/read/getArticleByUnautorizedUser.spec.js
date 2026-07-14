import { test } from '../../_fixtures/fixtures';

let slug;

test.beforeEach(async ({ registeredUser, api, articleWithOneTag }) => {
  const response = await api.articles.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await api.articles.assertSuccessResponseCode(response);

  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Get an article by unauthorized user`, async ({
  api,
  articleWithOneTag,
}) => {
  const article = articleWithOneTag;
  const response = await api.articles.getArticleBySlug(slug, '');

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
