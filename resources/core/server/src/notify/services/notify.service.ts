import { Inject, Injectable } from "@altv-mango/core";
import { PlayerService } from "../../player/services/player.service";
import type { NotifyRepository } from "../interfaces/notify-repository.interface";
import { NOTIFY_REPOSITORY } from "../providers/notify-repository.provider";

@Injectable()
export class NotifyService {
    constructor(@Inject(NOTIFY_REPOSITORY) private notifyRepository: NotifyRepository, @Inject(PlayerService) private playerService: PlayerService) {}
    sendNotifyToPlayer(playerId: number, text: string) {
        const player = this.playerService.findById(playerId)
        this.notifyRepository.sendNotify(player, text)
    }

    sendNotifyToPlayers(playerIds: number[], text: string) {
        for (const playerId of playerIds) {
            this.sendNotifyToPlayer(playerId, text)
        }
    }
}
