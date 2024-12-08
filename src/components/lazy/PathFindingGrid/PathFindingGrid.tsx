'use client';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './PathFindingGrid.module.css';
import { Cell } from './cell';
import { someDistance } from './heuristic';
import { getRandomTerrainCost } from './terrain';
import { Heap } from './heap';

function getBackgroundColor(terrainCost: number): string {
  // Calculate the grayscale value (0 for white, 255 for black)
  // const grayValue = Math.round((1 - terrainCost) * 255)
  // return `rgb(${grayValue},${grayValue},${grayValue})`
  return terrainCost === 1 ? `rgb(0,0,0)` : `rgb(64,64,64)`;
}

function generateGrid(nRows: number, nCols: number): Cell[][] {
  const grid: Cell[][] = new Array(nRows);
  for (let rowIndex = 0; rowIndex < nRows; rowIndex++) {
    const column: Cell[] = new Array(nCols);
    for (let colIndex = 0; colIndex < nCols; colIndex++) {
      column[colIndex] = new Cell(rowIndex, colIndex, getRandomTerrainCost());
    }
    grid[rowIndex] = column;
  }
  return grid;
}

function getStartAndEndCells(grid: Cell[][]): {
  from: Cell;
  to: Cell;
} {
  const validCells = grid.flat().filter((cell) => cell.difficulty !== 1);

  if (validCells.length < 2) {
    // Not enough valid cells to select two distinct cells
    throw new Error(
      `Cannot select start and end cells as grid doesn't have enough free cells`
    );
  }

  let cell1: Cell;
  let cell2: Cell;

  do {
    cell1 = validCells[Math.floor(Math.random() * validCells.length)];
    cell2 = validCells[Math.floor(Math.random() * validCells.length)];
  } while (cell1.x === cell2.x && cell1.y === cell2.y);

  return {
    from: cell1,
    to: cell2,
  };
}

function getMoveCost(_from: Cell, to: Cell) {
  return to.difficulty;
}

function getEstimatedMoveCost(from: Cell, to: Cell) {
  return someDistance(from.x, from.y, to.x, to.y);
}

function getNeighbourNodes(
  grid: Cell[][],
  node: Cell,
  allowDiagonals: boolean = true
): Cell[] {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
  ];

  if (allowDiagonals) {
    directions.push({ dx: -1, dy: -1 });
    directions.push({ dx: 1, dy: 1 });
    directions.push({ dx: 1, dy: -1 });
    directions.push({ dx: -1, dy: 1 });
  }

  return directions.reduce<Cell[]>((neighbors, { dx, dy }) => {
    const newX = node.x + dx;
    const newY = node.y + dy;
    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      neighbors.push(grid[newX][newY]);
    }
    return neighbors;
  }, []);
}

function isNodeTraversable(
  grid: Cell[][],
  from: Cell,
  node: Cell,
  allowDiagonal: boolean
): boolean {
  if (node.difficulty === 1) return false;

  if (!allowDiagonal) {
    return true;
  }

  const isDiagonalMove =
    Math.abs(from.x - node.x) === 1 && Math.abs(from.y - node.y) === 1;
  if (isDiagonalMove) {
    const blockedHorizontally =
      grid[from.x + (node.x - from.x)][from.y].difficulty === 1;
    const blockedVertically =
      grid[from.x][from.y + (node.y - from.y)].difficulty === 1;
    return !(blockedHorizontally && blockedVertically);
  }

  return true;
}

function getCellId(grid: Cell[][], cell: Cell) {
  return cell.x + cell.y * grid[0].length;
}

interface PathFindingGridSettings {
  ROWS?: number;
  COLS?: number;
  NODE_WIDTH?: number;
  NODE_HEIGHT?: number;
  REFRESH_INTERVAL_MS?: number;
  pathAnimationSpeedMs?: number;
  algorithmSpeedMs?: number;
  allowDiagonalMovements?: boolean;
  debug?: boolean;
  showOpenClosedNodes?: boolean;
}

enum AnimationState {
  initialized = 'initialized',
  pathFindStarted = 'pathFindStarted',
  pathFindFinished = 'pathFindFinished',
  pathAnimationStarted = 'pathAnimationStarted',
  pathAnimationFinished = 'pathAnimationFinished',
}

export const PathFindingGrid = ({
  ROWS = 30,
  COLS = 30,
  NODE_WIDTH = 30,
  NODE_HEIGHT = 30,
  REFRESH_INTERVAL_MS = 3000,
  pathAnimationSpeedMs = 200,
  algorithmSpeedMs = 10,
  allowDiagonalMovements = true,
  debug = false,
  showOpenClosedNodes = true,
}: PathFindingGridSettings) => {
  // grid ----------------
  const [nRows] = useState<number>(ROWS);
  const [nCols] = useState<number>(COLS);
  const [grid, setGrid] = useState<Cell[][]>(() => generateGrid(nRows, nCols));

  // algorithm -----------
  const { from, to } = useMemo(() => getStartAndEndCells(grid), [grid]);
  const [currentNode, setCurrentNode] = useState<Cell | null>(null);
  const [openSet, setOpenSet] = useState<Cell[]>([]);
  const [closedSet, setClosedSet] = useState<Set<Cell>>(new Set());
  const [path, setPath] = useState<Cell[]>([]);

  // step state -----------
  const [state, setState] = useState<AnimationState>(
    AnimationState.initialized
  );
  // one iteration of pathFinding, algorithm moves from one cell to next cell
  const currentIterationRef = useRef<NodeJS.Timeout | null>(null);
  // how long after current round end, to restart everything
  const startPathFindingDelayRef = useRef<NodeJS.Timeout | null>(null);

  const pathBounds: { minX: number; maxX: number; minY: number; maxY: number } =
    useMemo(() => {
      if (path.length === 0) {
        return {
          minX: -Infinity,
          maxX: Infinity,
          minY: -Infinity,
          maxY: Infinity,
        };
      }

      let minX = path[0].x;
      let maxX = path[0].x;
      let minY = path[0].y;
      let maxY = path[0].y;

      for (const cell of path) {
        if (cell.x < minX) minX = cell.x;
        if (cell.x > maxX) maxX = cell.x;
        if (cell.y < minY) minY = cell.y;
        if (cell.y > maxY) maxY = cell.y;
      }

      return { minX, maxX, minY, maxY };
    }, [path]);

  function clearIterationTimeout() {
    if (currentIterationRef.current) {
      clearTimeout(currentIterationRef.current);
      currentIterationRef.current = null;
    }
  }

  function clearPathFindingDelayTimeout() {
    if (currentIterationRef.current) {
      clearTimeout(currentIterationRef.current);
      currentIterationRef.current = null;
    }
  }

  useEffect(() => {
    const openSet: Heap<Cell> = new Heap();
    const closedSet: Set<Cell> = new Set();

    const iterate = () => {
      // Path doesn't exist -> gotta stop everything and restart
      if (openSet.isEmpty()) {
        setState(AnimationState.pathFindFinished);
        clearIterationTimeout();
        clearPathFindingDelayTimeout();
        startPathFindingDelayRef.current = setTimeout(
          reset,
          REFRESH_INTERVAL_MS
        );
        return;
      }

      // current <-node in open with the lowest fCost
      // remove current from open
      const currentNode = openSet.pop()!;
      setCurrentNode(currentNode);
      setOpenSet([...openSet]);
      // remove current to closed
      closedSet.add(currentNode);
      setClosedSet(new Set(closedSet));

      // if current is the target node // path has been found
      if (currentNode === to) {
        setState(AnimationState.pathFindFinished);
        clearIterationTimeout();
        clearPathFindingDelayTimeout();
        // Reconstruct path
        const path: Cell[] = [];
        for (let temp: Cell | null = currentNode; temp; temp = temp.parent) {
          path.push(temp);
        }

        animatePath(path.reverse());
        return;
      }

      const neighbors = getNeighbourNodes(
        grid,
        currentNode,
        allowDiagonalMovements
      );
      // for each neighbor of the current node
      for (const neighbor of neighbors) {
        // if neighbor is not traversable or neighbour is in closed
        if (
          closedSet.has(neighbor) ||
          !isNodeTraversable(
            grid,
            currentNode,
            neighbor,
            allowDiagonalMovements
          )
        ) {
          // skip to the next neighbor
          continue;
        }

        // new path to neighbor
        const newMovementCostToNeighbor =
          currentNode.gCost + getMoveCost(currentNode, neighbor);

        // new path to neighbor is shorter or neighbor is not in open
        if (
          newMovementCostToNeighbor < neighbor.gCost ||
          !openSet.contains(neighbor)
        ) {
          neighbor.gCost = newMovementCostToNeighbor;
          neighbor.hCost = getEstimatedMoveCost(neighbor, to);
          neighbor.parent = currentNode;

          // if neighbor is not in open
          if (!openSet.contains(neighbor)) {
            // add neighbor to open
            openSet.push(neighbor);
          }
          // need to update its properties in the heap
          else {
            openSet.updateItem(neighbor);
          }
          setOpenSet([...openSet]);
        }
      }
      clearIterationTimeout();
      currentIterationRef.current = setTimeout(iterate, algorithmSpeedMs);
    };

    const startPathFinding = () => {
      setState(AnimationState.pathFindStarted);

      // initialize for path finding
      from.gCost = 0;
      from.hCost = getEstimatedMoveCost(from, to);
      from.parent = null;
      openSet.push(from);
      setOpenSet([...openSet]);

      currentIterationRef.current = setTimeout(iterate, algorithmSpeedMs);
    };

    startPathFindingDelayRef.current = setTimeout(startPathFinding, 1000);

    // Cleanup on unmount or effect re-run
    return () => {
      clearIterationTimeout();
      clearPathFindingDelayTimeout();
    };
  }, [from, to, grid]);

  const reset = () => {
    setPath([]);
    setGrid(generateGrid(nRows, nCols));
    setOpenSet([]);
    setClosedSet(new Set());
    setCurrentNode(null);
    setState(AnimationState.initialized);
    clearIterationTimeout();
    clearPathFindingDelayTimeout();
  };

  const animatePath = async (path: Cell[]) => {
    clearIterationTimeout();
    clearPathFindingDelayTimeout();
    const timeouts = path.map((cell, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setPath((prevPath) => [...prevPath, cell]);
          resolve();
        }, index * pathAnimationSpeedMs);
      });
    });

    setState(AnimationState.pathAnimationStarted);
    await Promise.all(timeouts);
    setState(AnimationState.pathAnimationFinished);

    startPathFindingDelayRef.current = setTimeout(reset, REFRESH_INTERVAL_MS);
  };

  const isWithinFocus = (cell: Cell) => {
    const { minX, maxX, minY, maxY } = pathBounds;
    return cell.x >= minX && cell.x <= maxX && cell.y >= minY && cell.y <= maxY;
  };

  const pathFound = state === AnimationState.pathFindFinished;
  const animationFinished = state === AnimationState.pathAnimationFinished;

  return (
    <div
      suppressHydrationWarning
      className={styles.gridContainer}
      style={{
        gridTemplateColumns: `repeat(${nCols}, ${NODE_WIDTH}px)`,
        gridTemplateRows: `repeat(${nRows}, ${NODE_HEIGHT}px)`,
        ...(animationFinished && {
          filter: 'brightness(0.7)',
        }),
        width: nCols * NODE_WIDTH,
        height: nRows * NODE_HEIGHT,
      }}
    >
      {/* Render Terrain */}
      {grid.flat().map((cell) => (
        <motion.div
          suppressHydrationWarning
          data-id={getCellId(grid, cell)}
          key={getCellId(grid, cell)}
          className={styles.cell}
          data-terrain-cost={cell.difficulty}
          data-x={cell.x}
          data-y={cell.y}
          style={{
            top: cell.y * NODE_HEIGHT,
            left: cell.x * NODE_WIDTH,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            zIndex: 0.96,
          }}
          animate={{
            scale: isWithinFocus(cell) && animationFinished ? 0.96 : 0.86,
            backgroundColor:
              animationFinished && !isWithinFocus(cell)
                ? 'rgb(14,14,14)'
                : getBackgroundColor(cell.difficulty),
          }}
        />
      ))}
      {/* Render Open Cells */}
      {showOpenClosedNodes &&
        !animationFinished &&
        openSet.map((cell) => (
          <motion.div
            suppressHydrationWarning
            data-id={`${getCellId(grid, cell)}-open`}
            key={`${getCellId(grid, cell)}-open`}
            className={styles.cell}
            style={{
              top: cell.y * NODE_HEIGHT,
              left: cell.x * NODE_WIDTH,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
              zIndex: 2,
              scale: 0.86,
            }}
            animate={{
              backgroundColor: 'rgb(179, 19, 18)',
            }}
          />
        ))}
      {/* Render Closed Cells */}
      {showOpenClosedNodes &&
        !animationFinished &&
        Array.from(closedSet).map((cell) => (
          <motion.div
            suppressHydrationWarning
            data-id={`${getCellId(grid, cell)}-closed`}
            key={`${getCellId(grid, cell)}-closed`}
            className={styles.cell}
            style={{
              top: cell.y * NODE_HEIGHT,
              left: cell.x * NODE_WIDTH,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
              zIndex: 2,
              scale: 0.86,
            }}
            animate={{
              backgroundColor: 'rgb(179, 19, 18)',
            }}
          />
        ))}
      {/* Render Path Cells */}
      {path.map((cell) => {
        const isFrom = cell.x === from.x && cell.y === from.y;
        const isTo = cell.x === to.x && cell.y === to.y;

        const backgroundColor = isFrom
          ? 'rgb(132, 94, 237)'
          : isTo
            ? 'rgb(85, 182, 133)'
            : 'rgb(255, 255, 255)';

        return (
          <motion.div
            suppressHydrationWarning
            data-id={`${getCellId(grid, cell)}-path`}
            key={`${getCellId(grid, cell)}-path`}
            className={styles.cell}
            style={{
              backgroundColor,
              top: cell.y * NODE_HEIGHT,
              left: cell.x * NODE_WIDTH,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
              zIndex: 3,
            }}
            initial={{
              scale: 0.86,
            }}
            animate={{
              scale: 0.96,
              backgroundColor,
            }}
          />
        );
      })}
      {/* Render Current Cell */}
      {currentNode && (
        <motion.div
          suppressHydrationWarning
          data-id={`${getCellId(grid, currentNode)}-current`}
          key={`${getCellId(grid, currentNode)}-current`}
          className={styles.cell}
          style={{
            top: currentNode.y * NODE_HEIGHT,
            left: currentNode.x * NODE_WIDTH,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            zIndex: 4,
            scale: 0.86,
          }}
          animate={{
            backgroundColor: 'rgb(255,192,203)',
          }}
        />
      )}
      {/* Render From Cell */}
      {from && (
        <motion.div
          suppressHydrationWarning
          data-id={`from`}
          key={`from`}
          className={styles.cell}
          style={{
            top: from.y * NODE_HEIGHT,
            left: from.x * NODE_WIDTH,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            zIndex: 5,
          }}
          animate={{
            scale: pathFound ? 0.96 : 0.86,
            top: from.y * NODE_HEIGHT,
            left: from.x * NODE_WIDTH,
            rotate: [90, -90][from.x % 2],
            backgroundColor: 'rgb(132, 94, 237)',
          }}
        />
      )}
      {/* Render To Cell */}
      {to && (
        <motion.div
          suppressHydrationWarning
          data-id={`to`}
          key={`to`}
          className={styles.cell}
          style={{
            top: to.y * NODE_HEIGHT,
            left: to.x * NODE_WIDTH,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            zIndex: 5,
          }}
          animate={{
            scale: pathFound ? 0.96 : 0.86,
            top: to.y * NODE_HEIGHT,
            left: to.x * NODE_WIDTH,
            rotate: [90, -90][to.x % 2],
            backgroundColor: 'rgb(85, 182, 133)',
          }}
        />
      )}
      {debug && (
        <div
          style={{
            position: 'absolute',
            zIndex: 6,
            background: 'black',
          }}
        >
          {state}
        </div>
      )}
    </div>
  );
};

export default PathFindingGrid;
