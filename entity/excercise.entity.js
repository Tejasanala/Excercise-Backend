import { Entity } from "electrodb"; // ORM - object relational mapping
import { client } from "../util/dbconnection.js";
const Excercises = new Entity(
  {
    model: {
      entity: "Excercise",
      version: "1",
      service: "ExcerciseService",
    },
    attributes: {
      ValueId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
      },
      type: {
        type: "string",
      },
      image: {
        type: "string",
      },
      preferredTime: {
        type: "string",
      },
      rating: {
        type: "number",
      },
      bodyPartAffected: {
        type: "string",
      },
      moreInfo: {
        type: "string",
      },
      description: {
        type: "string",
      },
      cautionAge: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["ValueId"],
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
  { client, table: "excercises" }
);

export { Excercises };
