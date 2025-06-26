import { UserBuilder } from './UserBuilder';

export class UserDirector {
  constructor() {
    this.builder = new UserBuilder();
  }

  buildUser() {
    this.builder.reset();

    this.builder.setUsername();
    this.builder.setEmail();
    this.builder.setPassword();

    const user = this.builder.getProduct();

    return user;
  }

  buildWithEmptyEmail() {
    this.builder.reset();

    this.builder.setUsername();
    this.builder.setEmail('');
    this.builder.setPassword();

    const newUser = this.builder.getProduct();

    return newUser;
  }
}
