const continuous_terrain: number[] = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
const binary_terrain: number[] = [0, 0, 0, 0, 0, 0, 0]
const empty_terrain: number[] = [0]

function getRandomTerrainCost() {
    const randomIndex = Math.floor(Math.random() * binary_terrain.length)
    return binary_terrain[randomIndex]
}

export {
    continuous_terrain,
    binary_terrain,
    empty_terrain,
    getRandomTerrainCost
}