import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }
  async createArticle(article, token = null) {
    return await this.step(`Create new article`, async () => {
      return await this.client.post(ROUTES.articles().index, {
        data: { article },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async getArticleBySlug(slug, token = null) {
    return await this.step(`Get article by it's slug`, async () => {
      return await this.client.get(ROUTES.articles(slug).single, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async parseSlugFromResponse(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }

  async assertResponseBodyContainsSlug(response) {
    await this.step(`Assert response body contains article slug`, async () => {
      const slug = await this.parseSlugFromResponse(response);

      expect(slug.length > 1).toBe(true);
    });
  }

  async assertArticleTitleHasCorrectValue(response, text) {
    await this.step(
      `Assert response body has correct artcile title`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.title).toBe(text);
      },
    );
  }

  async assertArticleDescriptionHasCorrectValue(response, text) {
    await this.step(
      `Assert response body has correct article description`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.description).toBe(text);
      },
    );
  }

  async assertArticleBodyHasCorrectValue(response, text) {
    await this.step(
      `Assert response body has correct article body`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.body).toBe(text);
      },
    );
  }

  async assertArticleTagsHasCorrectValue(response, tagList) {
    await this.step(
      `Assert response body has correct article tags`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.tagList).toStrictEqual(tagList);
      },
    );
  }
}
