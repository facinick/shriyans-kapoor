import dynamic from 'next/dynamic';

const PathFindingGrid = dynamic(() => import('./PathFindingGrid'));

export default PathFindingGrid;
