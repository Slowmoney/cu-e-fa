import { Injectable } from "@altv-mango/core";
import { HandStateEntity } from "../entities/hand-state.entity";
import { MinigameStateEntity } from "../entities/minigame-state.entity";
import type { MinigameRepository } from "../interfaces/minigame-repository.interface";


@Injectable()
export class MinigameRepositoryImpl implements MinigameRepository {
    static allMinigames = new Set<MinigameStateEntity>()
    create(playerIds: number[]) {
        const minigame = new MinigameStateEntity()
        for (const playerId of playerIds) {
            minigame.addPlayer(playerId, new HandStateEntity())
        }
        MinigameRepositoryImpl.allMinigames.add(minigame)
        return minigame;
    }

    clear(minigame: MinigameStateEntity) {
        MinigameRepositoryImpl.allMinigames.delete(minigame)
    }

    findByPlayerId(playerId: number) {
        for (const minigame of MinigameRepositoryImpl.allMinigames) {
            if (minigame.hasPlayer(playerId)) return minigame;
        }
        return null;
    }
}
