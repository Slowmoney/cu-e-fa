import * as alt from "@altv/server";
import type { NotifyRepository } from "../interfaces/notify-repository.interface";

export class AltvNotifyRepositoryImpl implements NotifyRepository {
    sendNotify(player: alt.Player, text: string) {
        player.emit("notify", text)
    }
}
