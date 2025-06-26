import { faker } from '@faker-js/faker';
import { UserBuilder } from '../user/UserBuilder';

export class UserProfile {
  constructor() {
    this.username = null;
    this.email = null;
    this.password = null;
    this.token = null;
    this.bio = null;
    this.image = null;
  }
}

export class ProfileBuilder extends UserBuilder {
  reset() {
    this.product = new UserProfile();
  }

  setBio(bio = null) {
    this.product.bio = bio ?? this.generateBio();
  }

  setImage(url = null) {
    this.product.image = url ?? this.generatePictureUrl();
  }

  generatePictureUrl() {
    return faker.image.avatar();
  }

  generateBio() {
    return faker.lorem.sentences(2);
  }
}
