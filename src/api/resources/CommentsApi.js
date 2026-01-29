import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';
import { SUCCESS_CODE } from '../../constants/responceCodes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(articleSlug, comment, token = null) {
    return await this.step(`Create new comment`, async () => {
      return await this.client.post(ROUTES.comments(articleSlug).index, {
        data: { comment },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async deleteComment(articleSlug, commentId, token = null) {
    return await this.step(`Delete comment`, async () => {
      return await this.client.delete(ROUTES.comments(articleSlug, commentId).index, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async assertSuccessResponseCode(response) {
    await this.assertResponseCode(response, SUCCESS_CODE);
  }

  async parseCommentIdFromResponse(response) {
    const body = await this.parseBody(response);

    return body.comment.id;
  }

  async assertResponseBodyContainsCommentId(response) {
    await this.step(
      `Assert response body contains comment id`,
      async () => {
        const commentId = await this.parseCommentIdFromResponse(response);

        expect(commentId).toBeDefined();
        expect(typeof commentId).toBe('number');
      },
    );
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