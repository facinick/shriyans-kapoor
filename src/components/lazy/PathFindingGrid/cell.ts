import { HeapNode } from "./heap"

export class Cell extends HeapNode<Cell> {

    public readonly x: number
    public readonly y: number
    public readonly difficulty: number

    public gCost: number = Infinity
    public hCost: number = 0

    public _heapIndex: number = 0

    public parent: Cell | null = null

    constructor(
        x: number,
        y: number,
        difficulty: number
    ) {
        super()
        this.x = x
        this.y = y
        this.difficulty = difficulty
        this.x = x
    }

    // returns more if higher priority?
    public compareTo(other: Cell): number {
        const compare = this.fCost - other.fCost
        if (compare === 0) {
            return this.hCost - other.hCost
        }
        return -compare
    }

    public get fCost() {
        return this.gCost + this.hCost
    }

    public get heapIndex() {
        return this._heapIndex
    }

    public set heapIndex(index: number) {
        this._heapIndex = index
    }
}