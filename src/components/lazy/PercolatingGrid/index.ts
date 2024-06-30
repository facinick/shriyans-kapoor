import dynamic from "next/dynamic";

const PercolatingGrid = dynamic(() => import("./PercolatingGrid"));

export default PercolatingGrid;
