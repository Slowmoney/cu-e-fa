import * as alt from "@altv/server";

export interface NotifyRepository {
    sendNotify(player: alt.Player, text: string): void;
}
