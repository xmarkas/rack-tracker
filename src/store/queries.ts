import { indexes, queries } from "./store";

/**
 *  Building query
 * @param Model baseModel
 * @returns {} query functions
 */
export const buildingQueries = (baseModel: { [key: string]: any }) => {
  const indexName: string = `byBuilding${baseModel.tableName}`;
  indexes.setIndexDefinition(indexName, baseModel.tableName, "building");
  // by buliding
  const buildings = () => indexes.getSliceIds(indexName);
  const idsByBuilding = (b = "ATN3"): string[] =>
    indexes.getSliceRowIds(indexName, b);
  const byBuilding = (b = "ATN3"): Object[] =>
    idsByBuilding(b).map(baseModel.byId);

  return { buildings, byBuilding };
};

export const queryTaskCount = (baseModel: { [key: string]: any }) => {
  const taskCounts = (
    queryId: string,
    cellId: string,
    val: string | boolean
  ) => {
    const results = queries.setQueryDefinition(
      queryId,
      baseModel.tableName,
      ({ select, where }) => {
        select(cellId);
        where(cellId, val);
      }
    );
    return results;
  };

  // by hall
  const countsByHall = (queryId: string, building: string, hall: string) => {
    const results = queries.setQueryDefinition(
      queryId,
      baseModel.tableName,
      ({ select, where }) => {
        select("Id");
        where("building", building);
        where("hall", hall);
      }
    );
    return results;
  };

  // by serial number
  const bySerialNumber = (queryId: string, val: string | boolean) => {
    const results = queries.setQueryDefinition(
      queryId,
      baseModel.tableName,
      ({ select, where }) => {
        select("serialNumber");
        where("serialNumber", val);
      }
    );

    return results.getResultRowIds(queryId)[0];
  };

  const removeByFacility = (facility: string) => {
    const queryId = baseModel.tableName + facility + "remove";
    const result = queries.setQueryDefinition(
      queryId,
      baseModel.tableName,
      ({ select, where }) => {
        select("serialNumber");
        where((getcell) => {
          return Boolean(getcell("building")?.toString().includes(facility));
        })
      }
    );
    result.getResultRowIds(queryId).every(id => baseModel.remove(id))
  };

  return { taskCounts, countsByHall, bySerialNumber, removeByFacility};
};
