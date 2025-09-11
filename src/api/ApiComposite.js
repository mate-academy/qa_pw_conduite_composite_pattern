import { UsersApi } from './resources/UsersApi';
import { ProfilesApi } from './resources/ProfilesApi';
import { ArticlesApi } from './resources/ArticlesApi';
import { CommentsApi } from './resources/CommentsApi';

export class ApiComposite {
  constructor(client) {
    this.client = client;
    this.users = new UsersApi(this.client);
    this.profiles = new ProfilesApi(this.client);
    this.articles = new ArticlesApi(this.client);
    this.comments = new CommentsApi(this.client);
  }

  async createComment(comment, article, token = null) {
    return await this.comments.createComment(comment, article, token);
  }

  async deleteComment(commentId, article, token = null) {
    return await this.comments.deleteComment(commentId, article, token);
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

  async assertSuccessResponseCode(response) {
    await this.users.assertSuccessResponseCode(response);
  }
  
}
