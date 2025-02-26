import {Model } from './store';
import { buildingQueries, queryTaskCount } from './queries';

const Decoms = (() => {
    const baseModel = Model('Decoms');
    const queries = buildingQueries(baseModel);
    const decomCount = queryTaskCount(baseModel).taskCounts('decomCount', 'unset', false);
    const priorityCount = queryTaskCount(baseModel).taskCounts('priorityDecoms', 'hasPriority', true);
    
    return {
        ...baseModel,
        ...queries,
        decomCount,
        priorityCount
    }
})();

export default Decoms;