function euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function someDistance(x1: number, y1: number, x2: number, y2: number): number {
    const distanceX = Math.abs(x1 - x2)
    const distanceY = Math.abs(y1 - y2)
    if (distanceX > distanceY) {
        return 14 * distanceY + 10 * (distanceX - distanceY)
    }

    return 14 * distanceX + 10 * (distanceY - distanceX)
}

function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = Math.abs(x2 - x1)
    const dy = Math.abs(y2 - y1)
    return dx + dy
}

export {
    euclideanDistance,
    manhattanDistance,
    someDistance
}