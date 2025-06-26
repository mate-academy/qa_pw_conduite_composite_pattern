import { UserDirector } from './user/UserDirector';
import { ProfileDirector } from './profile/ProfileDirector';

export class TestDataDirector {
  constructor() {
    this.user = new UserDirector();
    this.profile = new ProfileDirector();
  }
}
