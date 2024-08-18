import { Entity } from "electrodb"; // ORM - object relational mapping
import { client } from "../util/dbconnection.js";

const Customers = new Entity(
  {
    model: {
      entity: "customers",
      version: "1",
      service: "CustomersService",
    },
    attributes: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["username"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
    // add your DocumentClient and TableName as a second parameter
  },
  { client, table: "customers" }
);

export { Customers };
