import { Inject, Injectable } from "@altv-mango/core";
import * as alt from "@altv/server";
import { HandState } from "@shared";
import { NotifyService } from "../../notify/services/notify.service";
import { PlayerService } from "../../player/services/player.service";
import type { MinigameStateEntity } from "../entities/minigame-state.entity";
import type { MinigameRepository } from "../interfaces/minigame-repository.interface";
import { MINIGAME_REPOSITORY } from "../providers/minigame-repository.provider";

@Injectable()
export class MinigameService{
    constructor(@Inject(PlayerService) private playerService: PlayerService, @Inject(MINIGAME_REPOSITORY) private minigameRepository: MinigameRepository, @Inject(NotifyService) private notifyService: NotifyService) {}

    public startGameInRadius(player: alt.Player, radius = 10) {
        const minigame = this.minigameRepository.findByPlayerId(player.id)
        if (minigame) {
            this.notifyService.sendNotifyToPlayer(player.id, "Вы уже начали игру")
            return
        }
        const players = this.playerService.getPlayerInRadius(player.pos, radius, player.dimension)
        if (players.length < 2) {
            this.notifyService.sendNotifyToPlayer(player.id, "Никого нет рядом чтоб начать игру")
            return
        }
        this.startGame(players.map(e=>e.id));
    }

    public startGame(playerIds: number[]) {
        for (const player of playerIds) {
            const minigame = this.minigameRepository.findByPlayerId(player)
            if (minigame) {
                this.notifyService.sendNotifyToPlayers(playerIds, "Один из игроков уже начал игру")
                return
            }
        }
        this.minigameRepository.create(playerIds)
        this.notifyService.sendNotifyToPlayers(playerIds, "Начата игра")
    }

    public setHandState(playerId: number, newHandState: HandState) {
        const minigame = this.minigameRepository.findByPlayerId(playerId)
        if (!minigame) {
            this.notifyService.sendNotifyToPlayer(playerId, "Вы не начали игру")
            return
        }
        const handState = minigame.getHandState(playerId)
        if (!handState) {
            this.notifyService.sendNotifyToPlayer(playerId, "Вы не начали игру")
            return
        }
        handState.setState(newHandState)
    }

    public setHandStateAndCheckAllStates(playerId: number, newHandState: HandState) {
        const minigame = this.minigameRepository.findByPlayerId(playerId)
        if (!minigame) {
            this.notifyService.sendNotifyToPlayer(playerId, "Вы не начали игру")
            return
        }
        this.setHandState(playerId, newHandState)
        this.checkHandStates(minigame)
    }

    public checkHandStates(minigame: MinigameStateEntity) {
        if (minigame.isAllPlayerSetHand()) return
        const gameState = minigame.getState()
        this.minigameRepository.clear(minigame)
        if (gameState.winnerPlayers.length) {
            if (gameState.winnerPlayers.length === 1) {
                //Вы выиграли
                this.notifyService.sendNotifyToPlayers(gameState.winnerPlayers, "Вы выиграли")
            } else {
                this.startGame(gameState.winnerPlayers)
            }
        }
        if (gameState.loosePlayers.length) {
            if (gameState.loosePlayers.length === 1) {
                //Вы проиграли
                this.notifyService.sendNotifyToPlayers(gameState.winnerPlayers, "Вы проиграли")
            }
        }
        if (gameState.drawPlayers.length) {
            this.startGame(gameState.drawPlayers)
        }
    }
}
