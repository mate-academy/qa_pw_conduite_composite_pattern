import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(slug, comment = null, token = null) {
    return await this.step(`Create new comment`, async () => {
      const headers = {
        ...this._headers,
        ...(token ? { authorization: `Token ${token}` } : {}),
      };

      return await this.client.post(ROUTES.comments(slug).index, {
        data: {
          ...(comment ? { comment: { body: comment } } : {}),
        },
        headers,
      });
    });
  }

  async getComments(slug, token = null) {
    return await this.step(`Get comments`, async () => {
      const headers = {
        ...this._headers,
        ...(token ? { authorization: `Token ${token}` } : {}),
      };

      return await this.client.get(ROUTES.comments(slug).index, {
        headers,
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment with id ${commentId}`, async () => {
      const headers = {
        ...this._headers,
        ...(token ? { authorization: `Token ${token}` } : {}),
      };

      return await this.client.delete(ROUTES.comments(slug, commentId).single, {
        headers,
      });
    });
  }

  async getAndVerifyCommentFromResponse(response, comment) {
    const body = await this.parseBody(response);

    await this.step(`Assert response body contains comment text`, async () => {
      expect(body.comment.body).toBe(comment);
    });

    await this.step(`Assert response body contains comment id`, async () => {
      expect(body.comment.id).toBeDefined();
      expect(body.comment.id).not.toBeNull();
      expect(body.comment.id).not.toEqual('');
    });

    return body.comment.id;
  }

  async assertResponseBodyContainsAuthor(response, username) {
    await this.step(`Assert response body contains author`, async () => {
      const body = await this.parseBody(response);
      expect(body.comment.author.username).toBe(username);
    });
  }
}
