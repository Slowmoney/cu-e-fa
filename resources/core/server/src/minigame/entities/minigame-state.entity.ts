import { HandState } from "@shared";
import { BattleResultEnum } from "../enums/battle-result.enum";
import { HandStateEntity } from "./hand-state.entity";

export class MinigameStateEntity {
    private playerHandStates = new Map<number, HandStateEntity>()

    constructor() {}

    public addPlayer(playerId: number, state: HandStateEntity) {
        this.playerHandStates.set(playerId, state)
    }

    public removePlayer(playerId: number) {
        this.playerHandStates.delete(playerId)
    }

    public hasPlayer(playerId: number) {
        return this.playerHandStates.has(playerId);
    }

    public getHandState(playerId: number) {
        return this.playerHandStates.get(playerId) ?? null;
    }

    public getPlayers() {
        return [...this.playerHandStates.values()]
    }

    public isAllPlayerSetHand() {
        return this.getPlayers().every(e => e.getState() !== HandState.None)
    }

    public getState(): { winnerPlayers: number[]; loosePlayers: number[]; drawPlayers: number[]; battles: any } {
        const winnerPlayers = new Set<number>()
        const loosePlayers = new Set<number>()
        const drawPlayers = new Set<number>()
        const battles: { defenserPlayerId: number, attackerPlayerId: number; result: BattleResultEnum }[] = []
        const usedHandStates = new Set<HandState>()
        //if (this.playerHandStates.size <= 1) throw new Error("no players in game");

        for (const [defenserPlayerId, defenserHandState] of this.playerHandStates) {
            for (const [attackerPlayerId, attackerHandState] of this.playerHandStates) {
                if (defenserPlayerId === attackerPlayerId) continue;
                if (battles.some(e => (e.attackerPlayerId === attackerPlayerId || e.attackerPlayerId === defenserPlayerId) && (e.defenserPlayerId === attackerPlayerId || e.defenserPlayerId === defenserPlayerId))) continue;
                const attackResult = defenserHandState.battle(attackerHandState)

                usedHandStates.add(attackerHandState.getState())
                usedHandStates.add(defenserHandState.getState())
                battles.push({ defenserPlayerId, attackerPlayerId, result: attackResult })
                if (usedHandStates.has(HandState.None)) return { winnerPlayers: [], loosePlayers: [], drawPlayers: [...this.playerHandStates.keys()], battles }
                if (usedHandStates.has(HandState.Paper) && usedHandStates.has(HandState.Scissors) && usedHandStates.has(HandState.Rock)) return { winnerPlayers: [], loosePlayers: [], drawPlayers: [...this.playerHandStates.keys()], battles }
                if (attackResult === BattleResultEnum.Win) {
                    winnerPlayers.add(attackerPlayerId)
                    loosePlayers.add(defenserPlayerId)
                } else if(attackResult === BattleResultEnum.Loose) {
                    loosePlayers.add(attackerPlayerId)
                    winnerPlayers.add(defenserPlayerId)
                } else {
                    drawPlayers.add(defenserPlayerId)
                    drawPlayers.add(attackerPlayerId)
                }

            }
        }
        for (const player of winnerPlayers) {
            drawPlayers.delete(player)
        }

        return { winnerPlayers: [...winnerPlayers], loosePlayers: [...loosePlayers], drawPlayers: [...drawPlayers], battles }
    }
}
