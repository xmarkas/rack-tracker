import {Model } from './store';
import { buildingQueries, queryTaskCount } from './queries';

const Decoms = (() => {
    const baseModel = Model('Decoms');
    const queries = buildingQueries(baseModel);
    const taskQueries = queryTaskCount(baseModel);
    const decomCount = queryTaskCount(baseModel).taskCounts('decomCount', 'unset', false);
    const priorityCount = queryTaskCount(baseModel).taskCounts('priorityDecoms', 'hasPriority', true);
    const issueCount = queryTaskCount(baseModel).taskCounts('issueDecoms', 'hasIssue', true);
    const auditCount = queryTaskCount(baseModel).taskCounts('auditDecoms', 'auditComplete', false);
   

    return {
        ...baseModel,
        ...queries,
        decomCount,
        priorityCount,
        issueCount,
        auditCount,
        ...taskQueries
    }
})();

export default Decoms;