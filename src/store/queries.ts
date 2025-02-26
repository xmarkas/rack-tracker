import { indexes, queries } from "./store";

/**
 *  Building query
 * @param Model baseModel
 * @returns {} query functions
 */
export const buildingQueries = (baseModel: { [key: string]: any }) => {
  indexes.setIndexDefinition("byBuilding", baseModel.tableName, "building");
  // get all decoms associated with specific building
  const buildings = () => indexes.getSliceIds("byBuilding");
  const idsByBuilding = (b = "ATN3") => indexes.getSliceRowIds("byBuilding", b);
  const byBuilding = (b = "ATN3") => idsByBuilding(b).map(baseModel.byId);

  return { buildings, byBuilding };
};


export const queryTaskCount = (baseModel: { [key: string]: any }) => {
  const taskCounts = (queryId: string, cellId: string, val: string | boolean) => {
    const results = queries.setQueryDefinition(
      queryId,
      baseModel.tableName,
      ({ select, where }) => {
        select(cellId);
        where(cellId, val);
      }
    );
    return results;
  }

  // const priorityCounts = (queryId: string, cellId: string, val: string | boolean) => {
  //   const results = queries.setQueryDefinition(
  //     queryId,
  //     baseModel.tableName,
  //     ({ select, where }) => {
  //       select(cellId);
  //       where(cellId, val);
  //     }
  //   );
  //   return results;
  // }



  return {taskCounts}
  
};
