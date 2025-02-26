import {Model } from './store';
import { buildingQueries, queryTaskCount } from './queries';

const Slcs = (() => {
    const baseModel = Model('Slcs');
    const {buildings, byBuilding} = buildingQueries(baseModel);
    const slcCount = queryTaskCount(baseModel).taskCounts('slcCount', 'slcSET', false);
    const priorityCount = queryTaskCount(baseModel).taskCounts('prioritySlcs', 'hasPriority', true);
    
    return {
        ...baseModel,
        buildings,
        byBuilding,
        slcCount,
        priorityCount
    }
})();

export default Slcs;