import Realm from "realm";

// Define your schema for Flashcard
class Flashcard extends Realm.Object {
  id!: string;
  frontTitle!: string;
  frontValue!: string;
  backTitle!: string;
  backValue!: string;
  reviewDate!: Date;

  static schema = {
    name: "Flashcard",
    primaryKey: "id",
    properties: {
      id: "string",
      frontTitle: "string",
      frontValue: "string",
      backTitle: "string",
      backValue: "string",
      reviewDate: "date",
    },
  };
}

// Define your schema for Folder
class Folder extends Realm.Object {
  id!: string;
  name!: string;
  flashcards!: Realm.List<Flashcard>;

  static schema = {
    name: "Folder",
    primaryKey: "id",
    properties: {
      id: "string",
      name: "string",
      flashcards: "Flashcard[]",
    },
  };
}

// Initialize Realm with the schemas
const realm = new Realm({ schema: [Flashcard, Folder] });

export { realm, Flashcard, Folder };
