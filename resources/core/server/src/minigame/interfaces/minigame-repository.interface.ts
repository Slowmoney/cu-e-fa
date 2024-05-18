import type { MinigameStateEntity } from "../entities/minigame-state.entity";


export interface MinigameRepository {
    create(playerIds: number[]): MinigameStateEntity
    clear(minigame: MinigameStateEntity): void;
    findByPlayerId(playerId: number): MinigameStateEntity | null
}
