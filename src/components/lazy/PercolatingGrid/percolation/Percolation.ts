import { WeightedQuickUnion } from '../WeightedQuickUnion/WeightedQuickUnion';

export enum SiteState {
  OPEN = 'open',
  CLOSED = 'closed',
  FULL = 'full',
}

class Percolation {
  // constants
  private ROWS: number;
  private COLS: number;
  private TOP_VIRTUAL_SITE_INDEX: number;
  private BOTTOM_VIRTUAL_SITE_INDEX: number;
  private FIRST_ROW_INDEX: number;
  private FIRST_COL_INDEX: number;
  private LAST_ROW_INDEX: number;
  private LAST_COL_INDEX: number;
  // variables
  private sites: WeightedQuickUnion;
  private nSitesOpen: number = 0;
  private nSitesFlooded: number = 0;
  private siteState: Array<SiteState>;

  constructor(p: number, q: number) {
    this.ROWS = p;
    this.COLS = q;

    this.FIRST_ROW_INDEX = 0;
    this.FIRST_COL_INDEX = 0;
    this.LAST_ROW_INDEX = this.ROWS - 1;
    this.LAST_COL_INDEX = this.COLS - 1;
    this.TOP_VIRTUAL_SITE_INDEX = 0;

    const ARRAY_LENGTH = this.ROWS * this.COLS + 2;

    this.BOTTOM_VIRTUAL_SITE_INDEX = ARRAY_LENGTH - 1;

    this.sites = new WeightedQuickUnion(ARRAY_LENGTH);

    this.siteState = new Array<SiteState>(ARRAY_LENGTH).fill(SiteState.CLOSED);
    this.siteState[this.TOP_VIRTUAL_SITE_INDEX] = SiteState.FULL;
    this.siteState[this.BOTTOM_VIRTUAL_SITE_INDEX] = SiteState.OPEN;
  }

  public openSite(p: number) {
    if (this.isOpen(p)) {
      return [];
    }

    this.siteState[p] = SiteState.OPEN;
    this.nSitesOpen += 1;
    this.unionWithOpenNeighbours(p);

    const floodQueue: number[] = [];
    this.bfsFlood(p, floodQueue);
    return floodQueue;
  }

  private bfsFlood(p: number, floodQueue: number[]): void {
    const queue = [p];
    while (queue.length > 0) {
      const currentSite = queue.shift()!;

      if (!this.shouldFlood(currentSite)) {
        continue;
      }

      this.siteState[currentSite] = SiteState.FULL;
      this.nSitesFlooded += 1;
      floodQueue.push(currentSite);

      const neighbors = this.getNetighbours(currentSite);
      for (const neighbor of Object.values(neighbors)) {
        if (
          neighbor !== null &&
          this.isOpen(neighbor) &&
          !this.isFull(neighbor)
        ) {
          queue.push(neighbor);
        }
      }
    }
  }

  private shouldFlood(p: number): boolean {
    if (this.siteState[p] !== SiteState.OPEN) {
      return false;
    }

    const neighbors = this.getNetighbours(p);

    for (const [position, id] of Object.entries(neighbors)) {
      // top virtal site is always flooded
      if (
        position === 'top' &&
        id === null &&
        this.isFull(this.TOP_VIRTUAL_SITE_INDEX)
      ) {
        // console.log(`flood: ${p} because of ${id}`)
        return true;
      }

      if (id !== null && this.isFull(id)) {
        // console.log(`flood: ${p} because of ${id}`)
        return true;
      }
    }

    return false;
  }

  public getNSitesOpen(): number {
    return this.nSitesOpen;
  }

  public getNSitesFlooded(): number {
    return this.nSitesFlooded;
  }

  public getNSites(): number {
    return this.COLS * this.ROWS;
  }

  public unionWithOpenNeighbours(p: number): void {
    const { row } = this.getRowColsFromIndex(p);
    const { left, right, top, bottom } = this.getNetighbours(p);

    // connect to virtual sites if they nearby -------
    if (row === this.LAST_ROW_INDEX) {
      this.sites.union(p, this.BOTTOM_VIRTUAL_SITE_INDEX);
    }

    if (row === this.FIRST_ROW_INDEX) {
      this.sites.union(p, this.TOP_VIRTUAL_SITE_INDEX);
    }

    // connect to open neighbours
    if (left && this.isOpen(left)) {
      this.sites.union(p, left);
    }

    if (right && this.isOpen(right)) {
      this.sites.union(p, right);
    }

    if (top && this.isOpen(top)) {
      this.sites.union(p, top);
    }

    if (bottom && this.isOpen(bottom)) {
      this.sites.union(p, bottom);
    }
  }

  public getNetighbours(p: number): {
    left: number | null;
    right: number | null;
    top: number | null;
    bottom: number | null;
  } {
    const { row, col } = this.getRowColsFromIndex(p);

    const left = col === this.FIRST_COL_INDEX ? null : p - 1;
    const right = col === this.LAST_COL_INDEX ? null : p + 1;
    const top = row === this.FIRST_ROW_INDEX ? null : p - this.COLS;
    const bottom = row === this.LAST_ROW_INDEX ? null : p + this.COLS;

    return {
      left,
      right,
      top,
      bottom,
    };
  }

  public getTopVirtualNeighbours(): Array<{
    left: number | null;
    right: number | null;
    top: number | null;
    bottom: number | null;
  }> {
    const neighbours = [];

    for (let x = 1; x < this.LAST_COL_INDEX; x++) {
      neighbours.push({
        left: null,
        right: null,
        top: null,
        bottom: x,
      });
    }

    return neighbours;
  }

  public getRowColsFromIndex(p: number): { row: number; col: number } {
    return {
      row: Math.floor((p - 1) / this.COLS),
      col: (p - 1) % this.COLS,
    };
  }

  public isOpen(p: number): boolean {
    return this.siteState[p] === SiteState.OPEN || this.isFull(p);
  }

  public isPercolating(): boolean {
    return this.sites.connected(
      this.TOP_VIRTUAL_SITE_INDEX,
      this.BOTTOM_VIRTUAL_SITE_INDEX
    );
  }

  // a site is full, if any of it's neighbour is open and full.
  public isFull(p: number): boolean {
    return this.siteState[p] === SiteState.FULL;
  }

  public getPercolatingComponent(): number[] {
    return this.sites.findComponent(this.BOTTOM_VIRTUAL_SITE_INDEX);
  }

  public getData(): WeightedQuickUnion['id'] {
    return this.sites.getData();
  }

  public getSiteState() {
    return this.siteState;
  }

  public reset() {
    this.sites = new WeightedQuickUnion(this.ROWS * this.COLS + 2);

    this.siteState = new Array<SiteState>(this.ROWS * this.COLS + 2).fill(
      SiteState.CLOSED
    );
    this.siteState[this.TOP_VIRTUAL_SITE_INDEX] = SiteState.FULL;
    this.siteState[this.BOTTOM_VIRTUAL_SITE_INDEX] = SiteState.OPEN;

    this.nSitesOpen = 0;
    this.nSitesFlooded = 1;
  }
}

export { Percolation };
