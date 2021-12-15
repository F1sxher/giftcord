import { Model as M } from "mongoose";
import { User } from "../modules/db/types.db";

type acceptable = User;
type partial = Partial<User>;

export default class Model {
  private model: typeof M;
  private schema: "User";

  constructor(givenModel: typeof M, givenSchema: "User") {
    this.model = givenModel;
    this.schema = givenSchema;
  }

  public async findAll() {
    let documents: acceptable[] | undefined = await this.model
      .find()
      .exec()
      .then((docs) => {
        switch (this.schema) {
          case "User":
            let typeDocs: acceptable[] | undefined = docs;
            return typeDocs;
        }
      });

    return documents;
  }

  public async find(query: partial) {
    let documents: acceptable[] | undefined = await this.model
      .find(query)
      .exec()
      .then((docs) => {
        switch (this.schema) {
          case "User":
            let typeDocs: acceptable[] | undefined = docs;
            return typeDocs;
        }
      });

    return documents;
  }

  public async findOne(query: partial) {
    let document: acceptable | undefined = await this.model
      .findOne(query)
      .exec()
      .then((doc) => {
        switch (this.schema) {
          case "User":
            let typeDoc: acceptable | undefined = doc;
            return typeDoc;
        }
      });

    return document;
  }

  public async findById(id: partial) {
    let document: acceptable | undefined = await this.model
      .findById(id)
      .exec()
      .then((doc) => {
        switch (this.schema) {
          case "User":
            let typeDoc: acceptable | undefined = doc;
            return typeDoc;
        }
      });

    return document;
  }

  public async create(data: acceptable) {
    let document = await this.model.create(data, (err, res) => {
      if (err) {
        return err;
      }

      return res;
    });

    return document;
  }

  public async updateMany(query: partial, data: partial) {
    let documents = this.model.updateMany(query, data, (err, res) => {
      if (err) {
        return err;
      }

      return res;
    });

    return documents;
  }

  public async updateOne(query: partial, data: partial, clone?: boolean) {
    let document;
    if (clone)
      this.model
        .updateOne(query, data, (err, res) => {
          if (err) {
            return err;
          }
          return res;
        })
        .clone();
    if (!clone)
      this.model.updateOne(query, data, (err, res) => {
        if (err) {
          return err;
        }
        return res;
      });

    return document;
  }

  public async deleteOne(query: partial, clone?: boolean) {
    let document = this.model.deleteOne(query, (err) => {
      if (err) {
        return err;
      }

      return null;
    });

    if (clone) document.clone();

    return document;
  }

  public async deleteMany(query: partial) {
    let document = this.model.deleteMany(query, (err) => {
      if (err) {
        return err;
      }

      return null;
    });

    return document;
  }
}
