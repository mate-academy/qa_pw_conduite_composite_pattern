import { UsersApi } from './resources/UsersApi';
import { ProfilesApi } from './resources/ProfilesApi';
import { ArticlesApi } from './resources/ArticlesApi';
import { CommentsApi } from './resources/CommentsApi';

export class ApiComposite {
  constructor(client) {
    this.client = client;
    this.users = new UsersApi(client);
    this.profiles = new ProfilesApi(client);
    this.articles = new ArticlesApi(client);
    this.comments = new CommentsApi(client);
  }

  async registerNewUser(userData, token = null) {
    return await this.users.registerNewUser(userData, token);
  }

  async updateUser(userData) {
    return await this.users.updateUser(userData);
  }

  async loginUser(userData) {
    return await this.users.loginUser(userData);
  }

  async getProfile(username, token = null) {
    return await this.profiles.getProfile(username, token);
  }

  async followProfile(username) {
    return await this.profiles.followProfile(username);
  }

  async unfollowProfile(username) {
    return await this.profiles.unfollowProfile(username);
  }

  async createArticle(article, token = null) {
    return await this.articles.createArticle(article, token);
  }

  async getArticleBySlug(slug, token = null) {
    return await this.articles.getArticleBySlug(slug, token);
  }

  async parseSlugFromResponse(response) {
    return await this.articles.parseSlugFromResponse(response);
  }

  async parseCommentIdFromResponse(response) {
    return await this.comments.parseCommentIdFromResponse(response);
  }

  async createComment(slug, body, token) {
    return await this.comments.createComment(slug, body, token);
  }

  async createCommentWithoutBody(slug, token) {
    return await this.comments.createCommentWithoutBody(slug, token);
  }

  async createCommentWithoutAuthToken(slug, body) {
    return await this.comments.createCommentWithoutAuthToken(slug, body);
  }

  async deleteComment(slug, commentId, token) {
    return await this.comments.deleteComment(slug, commentId, token);
  }

  async assertSuccessResponseCode(response) {
    await this.users.assertSuccessResponseCode(response);
  }

  async assertCommentBodyHasCorrectValue(response, comment) {
    await this.comments.assertCommentBodyHasCorrectValue(response, comment);
  }

  async assertUnprocessableEntityResponseCode(response) {
    await this.comments.assertUnprocessableEntityResponseCode(response);
  }

  async assertUnauthorizedResponseCode(response) {
    await this.comments.assertUnauthorizedResponseCode(response);
  }

  async assertSuccessDeleteResponseCode(response) {
    await this.comments.assertSuccessDeleteResponseCode(response);
  }

  async assertForbiddenResponseCode(response) {
    await this.comments.assertForbiddenResponseCode(response);
  }
}
