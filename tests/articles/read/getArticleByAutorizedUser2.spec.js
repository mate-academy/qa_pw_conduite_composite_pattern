import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;

test.beforeEach(async ({ registeredUsers, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Get an article created by user1 by authorized user 2`, async ({
  api,
  articleWithOneTag,
  registeredUsers,
}) => {
  const article = articleWithOneTag;
  const response = await api.articles.getArticleBySlug(
    slug,
    registeredUsers[1].token,
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
