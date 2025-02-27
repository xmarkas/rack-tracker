import {Model } from './store';
import { buildingQueries, queryTaskCount } from './queries';

const Slcs = (() => {
    const baseModel = Model('Slcs');
    const {buildings, byBuilding} = buildingQueries(baseModel);
    const slcCount = queryTaskCount(baseModel).taskCounts('slcCount', 'slcSET', false);
    const priorityCount = queryTaskCount(baseModel).taskCounts('prioritySlcs', 'hasPriority', true);
    const issueCount = queryTaskCount(baseModel).taskCounts('issueSlcs', 'hasIssue', true);
    const auditCount = queryTaskCount(baseModel).taskCounts('auditSlcs', 'auditComplete', false);
   
    
    return {
        ...baseModel,
        buildings,
        byBuilding,
        slcCount,
        priorityCount,
        issueCount,
        auditCount
    }
})();

export default Slcs;