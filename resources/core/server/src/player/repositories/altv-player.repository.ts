import { Injectable } from "@altv-mango/core";
import * as alt from "@altv/server";
import type { PlayerRepository } from "../interfaces/player-repository.interface";

@Injectable()
export class AltvPlayerRepositoryImpl implements PlayerRepository {
    public getPlayersInRadius(pos: alt.Vector3, radius: number, dimension: number) {
        return alt.Player.all.filter(player => player.pos.isInRange(radius, pos.x, pos.y, pos.z) && player.dimension === dimension)
    }

    public findById(playerId: number) {
        return alt.Player.all.find(e => e.id === playerId) ?? null;
    }
}
