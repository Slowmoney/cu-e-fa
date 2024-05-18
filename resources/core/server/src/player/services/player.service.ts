import { Inject, Injectable } from "@altv-mango/core";
import * as alt from "@altv/server";
import type { PlayerRepository } from "../interfaces/player-repository.interface";
import { PLAYER_REPOSITORY } from "../providers/player-repository.provider";

@Injectable()
export class PlayerService{
    constructor(@Inject(PLAYER_REPOSITORY) private playerRepository: PlayerRepository) {}
    getPlayerInRadius(pos: alt.Vector3, radius: number, dimension: number) {
        return this.playerRepository.getPlayersInRadius(pos, radius, dimension)
    }

    findById(playerId: number) {
        const player = this.playerRepository.findById(playerId)
        if(!player) throw new Error("Player not found");
        return player;
    }
}
