import { test } from './../../_fixtures/fixtures';

test.use({ usersNumber: 2 });
let articleSlug;
const firstUserIndex = 0;
const secondUserIndex = 1;

test.beforeEach(async ({
  registeredUsers,
  articleWithoutTags,
  api,
}) => {
  const articleResponse = await api.articles.createArticle(
    articleWithoutTags,
    registeredUsers[firstUserIndex].token
  );
  articleSlug = articleResponse.article.slug;
});

//Test fails. Comment is created without body field.
test.fail('Creating a comment without body', async ({ 
  api,
  registeredUsers,
}) => {
  const response = await api.comments.createComment(
    articleSlug,
    '',
    registeredUsers[secondUserIndex].token,
  );
  await api.comments.assertResponseCode(response, 422);
});