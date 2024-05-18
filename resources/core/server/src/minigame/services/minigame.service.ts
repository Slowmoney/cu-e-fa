import { Inject, Injectable } from "@altv-mango/core";
import * as alt from "@altv/server";
import assert from "assert";
import { randomInt } from "crypto";
import { NotifyService } from "../../notify/services/notify.service";
import { PlayerService } from "../../player/services/player.service";
import type { MinigameStateEntity } from "../entities/minigame-state.entity";
import { HandState } from "../enums/hand-state.enum";
import type { MinigameRepository } from "../interfaces/minigame-repository.interface";
import { MINIGAME_REPOSITORY } from "../providers/minigame-repository.provider";

@Injectable()
export class MinigameService{

    constructor(@Inject(PlayerService) private playerService: PlayerService, @Inject(MINIGAME_REPOSITORY) private minigameRepository: MinigameRepository, @Inject(NotifyService) private notifyService: NotifyService) {
        this.test1()
        this.test2()
        this.test3()
        this.test4()
        this.test5()
        this.test6([1, 2, 3, 4, 5])
    }

    test1() {
        const minigame = this.minigameRepository.create([1, 2])
        this.setHandState(1, HandState.Paper)
        this.setHandState(2, HandState.Paper)
        const result = minigame.getState()
        console.log(result)
        assert(result.drawPlayers.includes(1) && result.drawPlayers.includes(2) && result.drawPlayers.length === 2 && result.winnerPlayers.length === 0 && result.loosePlayers.length === 0, "test 2 draw battles")
        this.minigameRepository.clear(minigame)
    }

    test2() {
        const minigame = this.minigameRepository.create([1, 2])
        this.setHandState(1, HandState.Paper)
        this.setHandState(2, HandState.Rock)

        const result = minigame.getState()
        console.log(result)
        assert(result.winnerPlayers.length === 1, 'too more winners')
        assert(result.loosePlayers.length === 1, 'too more loosers')
        assert(result.winnerPlayers.includes(1), 'no winner')
        assert(result.loosePlayers.includes(2), 'no looser')
        assert(result.drawPlayers.length === 0, 'no valid draw state')
        this.minigameRepository.clear(minigame)
    }

    test3() {
        const minigame = this.minigameRepository.create([1, 2, 3])
        this.setHandState(1, HandState.Paper)
        this.setHandState(2, HandState.Rock)
        this.setHandState(3, HandState.Rock)

        const result = minigame.getState()
        console.log(result)
        assert(result.winnerPlayers.length === 1, 'too more winners')
        assert(result.loosePlayers.length === 2, 'too more loosePlayers')
        assert(result.drawPlayers.length === 2, 'too more drawPlayers')
        assert(result.winnerPlayers.includes(1), 'no winner')
        assert(result.loosePlayers.includes(2), 'no looser 2')
        assert(result.loosePlayers.includes(3), 'no looser 3')
        assert(result.drawPlayers.includes(2), 'no draw 2')
        assert(result.drawPlayers.includes(3), 'no draw 3')
        this.minigameRepository.clear(minigame)
    }

    test4() {
        const minigame = this.minigameRepository.create([1, 2, 3])
        this.setHandState(1, HandState.Paper)
        this.setHandState(2, HandState.Rock)
        this.setHandState(3, HandState.Scissors)

        const result = minigame.getState()
        console.log(result)
        assert(result.winnerPlayers.length === 0, 'too more winners')
        assert(result.loosePlayers.length === 0, 'too more loosePlayers')
        assert(result.drawPlayers.length === 3, 'too more drawPlayers')
        assert(result.drawPlayers.includes(1), 'no draw 1')
        assert(result.drawPlayers.includes(2), 'no draw 2')
        assert(result.drawPlayers.includes(3), 'no draw 3')
        this.minigameRepository.clear(minigame)
    }

    test5() {
        const minigame = this.minigameRepository.create([1, 2, 3, 4, 5])
        this.setHandState(1, HandState.None)
        this.setHandState(2, HandState.None)
        this.setHandState(3, HandState.Scissors)

        const result = minigame.getState()
        console.log(result)
        assert(result.winnerPlayers.length === 0, 'too more winners')
        assert(result.loosePlayers.length === 0, 'too more loosePlayers')
        assert(result.drawPlayers.length === 5, 'too more drawPlayers')
        assert(result.drawPlayers.includes(1), 'no draw 1')
        assert(result.drawPlayers.includes(2), 'no draw 2')
        assert(result.drawPlayers.includes(3), 'no draw 3')
        assert(result.drawPlayers.includes(4), 'no draw 4')
        assert(result.drawPlayers.includes(5), 'no draw 5')
        this.minigameRepository.clear(minigame)
    }

    test6(players: number[]) {
        console.log("run test 6", players)
        const minigame = this.minigameRepository.create(players)
        for (const player of players) {
            const value = randomInt(0, 3)
            if (value === 0) this.setHandState(player, HandState.Paper)
            else if (value === 1) this.setHandState(player, HandState.Rock)
            else this.setHandState(player, HandState.Scissors)
        }
        const result = minigame.getState()
        this.minigameRepository.clear(minigame)

        if (result.drawPlayers.length) {
            //console.log("draw", players, result)

            setImmediate(() => this.test6(result.drawPlayers))
        } else {
            //console.log(result)
        }
        if (result.winnerPlayers.length) {
            if (result.winnerPlayers.length > 1) {
                setImmediate(() => this.test6(result.winnerPlayers))

            } else {
                console.log("winner", players, result)
            }
        } else {
            //console.log(result)
        }

        /* this.test6(result.loosePlayers)

        this.test6(result.winnerPlayers) */
    }

    public startGameInRadius(player: alt.Player, radius = 10) {
        const players = this.playerService.getPlayerInRadius(player.pos, radius, player.dimension)
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
            throw new Error("Вы не начали игру")
        }
        const handState = minigame.getHandState(playerId)
        if (!handState) {
            throw new Error("Вы не начали игру")
        }
        handState.setState(newHandState)
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
