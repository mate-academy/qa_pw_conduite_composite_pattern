import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(slug, commentData, token = null) {
    return await this.step(`Create new comment`, async () => {
      return await this.client.post(ROUTES.comments(slug).index, {
        data: { comment: commentData },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment`, async () => {
      return await this.client.delete(ROUTES.comments(slug).single(commentId), {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async parseCommentIdFromResponse(response) {
    const body = await this.parseBody(response);

    return body.comment.id;
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
