import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';
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

  async createComment(slug, body, token) {
    return await this.step(`Create a comment`, async () => {
      return await this.client.post(ROUTES.comments(slug).create, {
        data: { comment: { body } },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async createCommentWithoutBody(slug, token) {
    return await this.step(`Create a comment without body`, async () => {
      return await this.client.post(ROUTES.comments(slug).create, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async createCommentWithoutAuthToken(slug, body) {
    return await this.step(`Create a comment without auth token`, async () => {
      return await this.client.post(ROUTES.comments(slug).create, {
        data: { comment: { body } },
        headers: {
          ...this._headers,
        },
      });
    });
  }

  async deleteComment(slug, commentId, token) {
    return await this.step(`Delete a comment`, async () => {
      return await this.client.delete(ROUTES.comments(slug, commentId).delete, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async assertCommentBodyHasCorrectValue(response, comment) {
    await this.step(
      `Assert response body has correct comment body`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.comment.body).toBe(comment);
      },
    );
  }
}