import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class UsersApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async registerNewUser(userData) {
    return await this.step(`Register new user`, async () => {
      return await this.client.post(ROUTES.users.index, {
        data: { user: userData },
        headers: this._headers,
      });
    });
  }

  async updateUser(userData) {
    return await this.step(`Update existing user`, async () => {
      let headers = {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      };

      return await this.client.put(ROUTES.user, {
        data: { user: userData },
        headers,
      });
    });
  }

  async loginUser(userData) {
    return await this.step(`Register new user`, async () => {
      return await this.client.post(ROUTES.users.login, {
        data: { user: userData },
        headers: this._headers,
      });
    });
  }

  async parseTokenFromBody(response) {
    const body = await this.parseBody(response);

    return body.user.token;
  }

  async assertResponseBodyContainsToken(response) {
    await this.step(`Assert response body contains token`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.token.length > 1).toBe(true);
    });
  }

  async assertEmailHasCorrectValue(response, email) {
    await this.step(`Assert response body has correct email`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.email).toBe(email);
    });
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(
      `Assert response body has correct image value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.user.image).toBe(image);
      },
    );
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.bio).toBe(bio);
    });
  }
}
