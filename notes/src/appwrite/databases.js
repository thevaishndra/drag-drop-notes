import { databases, collections } from "./config";
import { ID } from "appwrite";

const db = {};//holds dynamically generated functions

collections.forEach((collection) => {//looping through collections and creates db for each collection
  db[collection.name] = {
//crud operations from appwrite

    //new doc
    create: async (payload, id = ID.unique()) => {//unique id
      return await databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        payload
      );
    },//each collection gets corresponding db

    //finds doc by id and updates it in new data(payload)
    update: async (id, payload) => {
      return await databases.updateDocument(
        collection.dbId,
        collection.id,
        id,
        payload
      );
    },

    //deletes a doc permanently from db
    delete: async (id) => {
      return await databases.deleteDocument(collection.dbId, collection.id, id);
    },

    //fetches a specific doc by id
    get: async (id) => {
      return await databases.getDocument(collection.dbId, collection.id, id);
    },

    //fetches multiple doc, supports query filters
    list: async (queries) => {
      return await databases.listDocuments(
        collection.dbId,
        collection.id,
        queries
      );
    },
  };
});

export { db };
