import { Model } from "./store";
import { buildingQueries, queryTaskCount } from "./queries";

const Moves = (() => {
  const baseModel = Model("Moves");
  const queryBuilding = buildingQueries(baseModel);
  const taskQueries = queryTaskCount(baseModel);
  const unSetCount = queryTaskCount(baseModel).taskCounts(
    "unsetCount",
    "unset",
    false
  );
  const priorityCount = queryTaskCount(baseModel).taskCounts(
    "priorityMoves",
    "hasPriority",
    true
  );
  const issueCount = queryTaskCount(baseModel).taskCounts(
    "issueMoves",
    "hasIssue",
    true
  );
  const auditCount = queryTaskCount(baseModel).taskCounts(
    "auditMoves",
    "auditComplete",
    false
  );
  

  return {
    ...baseModel,
    ...queryBuilding,
    ...taskQueries,
    unSetCount,
    priorityCount,
    issueCount,
    auditCount
  };
})();

export default Moves;
