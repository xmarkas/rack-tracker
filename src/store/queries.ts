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

/**
 * queryTack Count
 * 
 * @param baseModel 
 * @returns Id's of the selected rows
 */
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

  /**
   * countsByHall
   * 
   * @param queryId name of the queryId
   * @param building the building to query
   * @param hall the hall to query
   * @returns returns the Id's of the selected rows
   */
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

  /**
   * 
   * @param queryId the name of the query
   * @param val the serial number of the requested row
   * @returns the result row Id
   */
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

  /**
   * removebyFacility (For demo only)
   * 
   * @param facility The facility to remove the store (ATN/PCI)
   */
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
