import { Controller, Inject } from "@altv-mango/core";
import { OnPlayer } from "@altv-mango/server";
import * as alt from "@altv/server";
import { MinigameService } from "../services/minigame.service";
import type { HandState } from "../enums/hand-state.enum";

@Controller()
export class MinigameController{
    constructor(@Inject(MinigameService) private minigameService: MinigameService) {}
    @OnPlayer("minigame:start")
    startMinigame(player: alt.Player) {
        this.minigameService.startGameInRadius(player, 10)
    }

    @OnPlayer("minigame:hand::set")
    setHandState(player: alt.Player, newHandState: HandState) {
        this.minigameService.setHandState(player.id, newHandState)
    }
}
