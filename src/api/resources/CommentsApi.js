import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);

    this._headers = {
      'content-type': 'application/json',
    };
  }

  async createComment(slug, comment, token = null) {
    return await this.step('Create new comment', async () => {
      return await this.client.post(ROUTES.comments(slug).index, {
        data: { comment },
        headers: {
          ...this._headers,
          ...(token ? { authorization: `Token ${token}` } : {}),
        },
      });
    });
  }

  async deleteComment(slug, id, token = null) {
    return await this.step('Delete comment', async () => {
      return await this.client.delete(ROUTES.comments(slug, id).single, {
        headers: {
          ...this._headers,
          ...(token ? { authorization: `Token ${token}` } : {}),
        },
      });
    });
  }

  async parseCommentIdFromResponse(response) {
    const body = await this.parseBody(response);

    return body.comment.id;
  }

  async assertCommentBodyHasCorrectValue(response, text) {
    await this.step('Assert comment has correct body', async () => {
      const body = await this.parseBody(response);

      expect(body.comment.body).toBe(text);
    });
  }

  async assertCommentAuthorHasCorrectValue(response, username) {
    await this.step('Assert comment has correct author', async () => {
      const body = await this.parseBody(response);

      expect(body.comment.author.username).toBe(username);
    });
  }
}
