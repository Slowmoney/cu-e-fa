import { HandState } from "@shared";
import { BattleResultEnum } from "../enums/battle-result.enum";

export class HandStateEntity {
    protected state: HandState = HandState.None;

    public battle(attacker: HandStateEntity) {
        if (attacker.getState() === HandState.None) return BattleResultEnum.Draw
        if (this.getState() === HandState.None) return BattleResultEnum.Draw
        if (attacker.state === this.state) return BattleResultEnum.Draw;
        if (attacker.state === HandState.Paper && this.state === HandState.Rock) return BattleResultEnum.Win;
        if (attacker.state === HandState.Rock && this.state === HandState.Scissors) return BattleResultEnum.Win;
        if (attacker.state === HandState.Scissors && this.state === HandState.Paper) return BattleResultEnum.Win;
        return BattleResultEnum.Loose;
    }

    public setState(newState: HandState) {
        this.state = newState;
    }

    public getState() {
        return this.state
    }
}
