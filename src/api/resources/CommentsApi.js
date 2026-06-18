import { ROUTES } from '../../constants/apiRoutes';
import { BaseApi } from '../BaseApi';
import { expect } from '@playwright/test';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async parseCommentIdFromResponse(response) {
    const body = await this.parseBody(response);

    return body.comment.id;
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
    return await this.step(`Delete article`, async () => {
      return await this.client.delete(ROUTES.comments(slug).single(commentId), {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
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
}
