import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(slug, comment, token = null) {
    return await this.step(`Create new comment`, async () => {
      return await this.client.post(ROUTES.comments(slug).index, {
        data: { comment },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment`, async () => {
      return await this.client.delete(ROUTES.comments(slug, commentId).single, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async parseIdFromResponse(response) {
    const body = await this.parseBody(response);

    return body.comment.id;
  }

  async assertResponseBodyContainsId(response) {
    await this.step(`Assert response body contains comment id`, async () => {
      const id = await this.parseIdFromResponse(response);

      expect(id).toBeGreaterThan(0);
    });
  }

  async assertCommentBodyHasCorrectValue(response, text) {
    await this.step(
      `Assert response body has correct comment body`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.comment.body).toBe(text);
      },
    );
  }

  async assertAuthorUsernameHasCorrectValue(response, username) {
    await this.step(
      `Assert response body has correct comment author`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.comment.author.username).toBe(username);
      },
    );
  }
}
