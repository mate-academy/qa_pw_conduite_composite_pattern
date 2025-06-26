import { ProfileBuilder } from './ProfileBuilder';

export class ProfileDirector {
  constructor() {
    this.builder = new ProfileBuilder();
  }

  buildNewProfile(token) {
    this.builder.reset();

    this.builder.setUsername();
    this.builder.setEmail();
    this.builder.setPassword();
    this.builder.setBio();
    this.builder.setImage();
    this.builder.setToken(token);

    const profile = this.builder.getProduct();

    return profile;
  }

  extendWithBioAndImage(user) {
    this.builder.reset();

    this.builder.setUsername(user.username);
    this.builder.setEmail(user.email);
    this.builder.setPassword(user.password);
    this.builder.setBio();
    this.builder.setImage();
    this.builder.setToken(user.token);

    const profile = this.builder.getProduct();

    return profile;
  }

  extendWithEmptyToken(user) {
    this.builder.reset();

    this.builder.setUsername(user.username);
    this.builder.setEmail(user.email);
    this.builder.setPassword(user.password);
    this.builder.setBio();
    this.builder.setImage();
    this.builder.setToken('');

    const profile = this.builder.getProduct();

    return profile;
  }
}
