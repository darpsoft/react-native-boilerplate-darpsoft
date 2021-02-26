import { storage } from "../../../index";
import request, { getOptionsWithToken, getOptions } from "../request";
import Config from "react-native-config";

export class CreateFilter {
  constructor() {
    this.limit = 0;
    this.skip = 0;
    this.filterEndpoint = { include: [] };
    this.filterWhere = { where: {} };
    this.filterWhereSociety = {};
    this.filterFields = {};
    this.formatNested = "";
    this.formatNestedTo = "";
    this.formatFunctionTo = false;
    this.filterRelationWhere = [];
    this.filterQuery = "";
  }

  resetFilter() {
    this.limit = 0;
    this.skip = 0;
    this.filterFields = {};
    this.filterWhereSociety = {};
    this.filterEndpoint = { include: [] };
    this.filterWhere = { where: {} };
    this.formatNested = "";
    this.formatNestedTo = "";
    this.formatFunctionTo = false;
    this.filterRelationWhere = [];
    this.filterQuery = "";
  }

  setFilterQuery(value) {
    this.filterQuery = value;
  }

  getFilterQuery() {
    return this.filterQuery;
  }

  setFilterRelationWhere(value) {
    this.filterRelationWhere = value;
  }

  getFilterRelationWhere() {
    return this.filterRelationWhere;
  }

  setFilterLimit(value) {
    this.limit = value;
  }

  setFilterSkip(value) {
    this.skip = value;
  }

  setFormatNested(value) {
    this.formatNested = value;
  }
  setFormatNestedTo(value) {
    this.formatNestedTo = value;
  }

  setformatFunctionTo() {
    this.formatFunctionTo = true;
  }

  getFormatNested() {
    return this.formatNested;
  }

  getFormatNestedTo() {
    return this.formatNestedTo;
  }

  setFilterWhereDate(start, end) {
    this.filterWhere = {
      ...this.filterWhere,
      where: {
        ...this.filterWhere.where,
        created: {
          between: [start, end],
        },
      },
    };
  }

  setFilterFields(fields) {
    this.filterFields = {
      ...this.filterFields,
      ...fields,
    };
  }

  setFilterWhereDefault(key, value) {
    this.filterWhere = {
      ...this.filterWhere,
      where: {
        ...this.filterWhere.where,
        [key]: value,
      },
    };
  }

  setFilterOrder(key, order) {
    this.filterWhere = {
      ...this.filterWhere,
      order: [`${key} ${order}`],
    };
  }

  setFilterWhere(where) {
    this.filterWhere = {
      ...this.filterWhere,
      where,
    };
  }

  setFilterWhereWithSociety() {
    const isLogged = Object.keys(this.getStorage("auth").dataUser).length === 0;
    if (isLogged) {
      this.setFilterWhereDefault("societyId", this.getStorage("auth").societyId);
    } else {
      const { subSocietyId, societyId } = this.getStorage("auth").dataUser;
      const society = subSocietyId !== null && subSocietyId !== "" ? subSocietyId : societyId;
      this.setFilterWhereDefault("societyId", society);
    }
  }

  setSocietyFilterWhere(key, value) {
    this.filterWhereSociety = {
      ...this.filterWhereSociety,
      [key]: value,
    };
  }

  setFilterEndpoint(filter) {
    this.filterEndpoint = {
      ...this.filterEndpoint,
      ...filter,
      include: [...this.filterEndpoint.include, ...(filter.include ?? [])],
    };
  }

  setFilterRelation(relation) {
    this.filterEndpoint = {
      ...this.filterEndpoint,
      include: [...this.filterEndpoint.include, ...relation],
    };
  }

  getFilterEndpoint() {
    const filter = {
      ...(this.limit === 0 ? {} : { limit: this.limit }),
      ...(this.skip === 0 ? {} : { skip: this.skip }),
      ...this.filterWhere,
      ...this.filterEndpoint,
      where: {
        ...this.filterWhere.where,
        ...(this.filterEndpoint.where ?? {}),
      },
      fields: {
        ...(this.filterEndpoint.fields ?? {}),
        ...this.filterFields,
      },
      include: [
        ...(this.filterEndpoint?.include?.map((include) => {
          return {
            ...include,
            scope: {
              ...(include?.scope ?? {}),
              where: {
                ...(include?.scope?.where ?? {}),
                ...(this.filterRelationWhere?.find((e) => e.relation === include.relation)?.where ?? {}),
              },
            },
          };
        }) ?? []),
      ],
    };
    return filter.where.or
      ? {
          ...filter,
          where: {
            or: filter.where.or.map((e) => {
              const { or, and, ...otherWhere } = filter.where;
              return { ...e, ...otherWhere };
            }),
            and: filter.where.and,
          },
        }
      : filter;
  }

  getFilterWhere() {
    return this.filterWhere;
  }
}

export class StorageServices extends CreateFilter {
  constructor() {
    super();
    this.typeStorage = "";
    this.nameStorage = "";
    this.store = {};
  }

  async setStorageCtx(ctx) {
    this.typeStorage = "ctx";
    // this.store = getOrCreateStore(await defaultValueStorage(ctx)).getState();
    this.store = storage.getState();
  }

  async setStorageDefault(storage) {
    this.typeStorage = "default";
    this.store = storage;
  }

  getOptions() {
    return this.typeStorage !== "" ? getOptionsWithToken(this.store.auth.tokenUser) : getOptions();
  }

  ifExist(nameStorage) {
    this.nameStorage = nameStorage;
    return this.store[nameStorage].data.length > 0;
  }

  getStorage(nameStorage) {
    if (Object.keys(this.store).length === 0) {
      this.store = storage.getState();
    }
    return this.store[nameStorage ? nameStorage : this.nameStorage];
  }

  async getFetchEndpoint(nameEndpoint) {
    function filtro(element) {
      return element;
    }

    const formatNested = this.getFormatNestedTo() !== "" ? "&formatNestedTo=" + this.getFormatNestedTo() : "&formatNested=" + this.getFormatNested();

    try {
      const url = `${Config.URL_API}/${nameEndpoint}`;
      const options = this.getOptions();
      console.log(`Url : ${nameEndpoint} |`, JSON.stringify(this.getFilterEndpoint()));
      return await request(
        `${url}?filter=${encodeURI(JSON.stringify(this.getFilterEndpoint()))}${
          this.formatFunctionTo ? "&formatFunctionTo=" + filtro.toString() : formatNested
        }${this.getFilterQuery()}`,
        options
      );
    } catch (error) {
      throw error;
    }
  }

  async getFetchWithSociety(nameEndpoint) {
    try {
      let requestData = [];
      const filter = {
        where: this.filterWhereSociety,
        fields: {
          id: true,
          name: true,
        },
        include: [
          {
            relation: nameEndpoint,
            scope: this.getFilterEndpoint(),
          },
        ],
      };
      const url = `${Config.URL_API}/societies`;
      const options = this.getOptions();
      const requests = await request(`${url}?filter=${encodeURI(JSON.stringify(filter))}`, options);
      requests
        .filter((request) => request[nameEndpoint])
        .forEach((request) => {
          requestData = [
            ...requestData,
            ...request[nameEndpoint].map((e) => ({
              ...e,
              societyName: request.name,
            })),
          ];
        });
      return requestData;
    } catch (error) {
      throw error;
    }
  }
}
