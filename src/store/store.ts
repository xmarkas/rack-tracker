// Create instance of Tinybase Store
import { createStore, createQueries, createIndexes } from "tinybase";
import { UnsetMove, SLC, Decom } from "./models";
import { v4 as uuidv4 } from "uuid";

export const store = createStore();
export const indexes = createIndexes(store);
export const queries = createQueries(store);

store.setValues({
  deployment: 31
})

export const values = (() => {
  const get = (key: string): any => store.getValue(key);
  const add = (key: string, value: string | boolean | number) =>
    store.setValue(key, value);
  const getJson = () => store.getValuesJson();
  const valueListener = (key: string) => store.addValueListener(key, () => get(key), false);

  return {
    add,
    get,
    getJson,
  };
})();

// Create a Model for tables
export const Model = (table: string) => {
  const add = (object: UnsetMove | SLC | Decom | null) => {
    if (object === null) return null;
    const id: string = uuidv4();
    store.setRow(table, id, object);
    return { id: id, entry: object };
  };

  const update = (id: string, object: {}) =>
    store.setPartialRow(table, id, object).getRow(table, id);

  const remove = (id: string) => store.delRow(table, id);
  const byId = (id: string) => store.getRow(table, id);
  const all = () => store.getTable(table);
  const count = () => store.getRowCount(table);
  const tableName: string = table;

  // createQueries(store).addResultRowCountListener()
  return {
    add,
    update,
    remove,
    byId,
    all,
    tableName,
    count,
  };
};
