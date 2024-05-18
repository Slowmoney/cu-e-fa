import * as alt from "@altv/server";

export interface PlayerRepository {
    getPlayersInRadius(pos: alt.Vector3, radius: number, dimension: number): alt.Player[];
    findById(playerId: number): alt.Player | null;
}
