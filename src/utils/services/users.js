import { StorageServices } from "./storage";

export class UsersServices extends StorageServices {
  constructor() {
    super();
  }

  async getUsers() {
    const filter = {};
    try {
      this.setFilterEndpoint(filter);
      this.setFormatNestedTo("");
      return await this.getFetchEndpoint(`users`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

const Users = new UsersServices();
export default Users;
