import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  buildHeaders(token) {
    return token
      ? { authorization: `Token ${token}`, ...this._headers }
      : { ...this._headers };
  }

  async createComment(slug, comment, token = null) {
    return await this.step(`Create new comment for article`, async () => {
      return await this.client.post(ROUTES.comments(slug).index, {
        data: { comment },
        headers: this.buildHeaders(token),
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment from article`, async () => {
      return await this.client.delete(ROUTES.comments(slug).single(commentId), {
        headers: this.buildHeaders(token),
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

  async assertCommentAuthorHasCorrectValue(response, username) {
    await this.step(
      `Assert response body has correct comment author`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.comment.author.username).toBe(username);
      },
    );
  }
}
