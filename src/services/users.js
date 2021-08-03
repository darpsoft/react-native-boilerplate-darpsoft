import { StorageServices } from "./storage";

export class UsersServices extends StorageServices {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async getUsers() {
    const filter = {};
    try {
      this.setFilterEndpoint(filter);
      return await this.getFetchEndpoint(`users`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

const Users = new UsersServices();
export default Users;
