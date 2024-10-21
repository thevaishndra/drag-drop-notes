import { Client, Databases } from "appwrite";
//Client -> set up connection to appwrite server; Database -> methods to interact with appwrite database

const client = new Client() //client object is necessary to authenticate and communicate with the Appwrite backend
  .setEndpoint(import.meta.env.VITE_ENDPOINT)//base url -> api endpoint
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);//allowing us to interact with database

const collections = [//an array containing configuration of database collection
  {
    name: "notes",
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
];

export { client, databases, collections };
