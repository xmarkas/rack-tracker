import {Model } from './store';
import { buildingQueries, queryTaskCount } from './queries';

const Moves = (() => {
    const baseModel = Model('Moves');
    const {buildings, byBuilding} = buildingQueries(baseModel);
    const unSetCount = queryTaskCount(baseModel).taskCounts('unsetCount', 'unset', false);
    const priorityCount = queryTaskCount(baseModel).taskCounts('priorityMoves', 'hasPriority', true);
   
    return {
        ...baseModel,
        buildings,
        byBuilding,
        unSetCount,
        priorityCount
    }
})();

export default Moves;