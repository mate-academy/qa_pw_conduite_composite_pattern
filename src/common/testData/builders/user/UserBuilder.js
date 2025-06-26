import { faker } from '@faker-js/faker';
import { BaseBuilder } from '../BaseBuilder';

export class User {
  constructor() {
    this.username = null;
    this.email = null;
    this.password = null;
    this.token = null;
  }
}

export class UserBuilder extends BaseBuilder {
  reset() {
    this.product = new User();
  }

  setUsername(username = null) {
    this.product.username = username ?? this.generateUsername();
  }

  setEmail(email = null) {
    this.product.email = email ?? this.generateEmail();
  }

  setPassword(password = null) {
    this.product.password = password ?? this.generatePassword();
  }

  setToken(token) {
    this.product.token = token;
  }

  generateFirstName() {
    return faker.person.firstName();
  }

  generateLastName() {
    return faker.person.lastName();
  }

  generateUsername() {
    const username = `${this.generateFirstName()}_${this.generateLastName()}`
      .replaceAll(`'`)
      .toLowerCase();

    return username;
  }

  generateEmail() {
    const email =
      `${this.product.username}_${faker.internet.email()}`.toLowerCase();

    return email;
  }

  generatePassword() {
    return faker.internet.password();
  }
}
