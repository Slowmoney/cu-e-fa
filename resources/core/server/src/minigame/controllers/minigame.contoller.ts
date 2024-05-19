import { Body, Controller, Inject } from "@altv-mango/core";
import { OnPlayer, Player } from "@altv-mango/server";
import * as alt from "@altv/server";
import type { HandState } from "@shared";
import { MinigameService } from "../services/minigame.service";

@Controller()
export class MinigameController{
    constructor(@Inject(MinigameService) private minigameService: MinigameService) {}
    @OnPlayer("minigame:start")
    startMinigame(@Player() player: alt.Player) {
        alt.log("minigame:start")
        this.minigameService.startGameInRadius(player, 10)
    }

    @OnPlayer("minigame:hand::set")
    setHandState(@Player() player: alt.Player, @Body() newHandState: HandState) {
        this.minigameService.setHandStateAndCheckAllStates(player.id, newHandState)
    }
}
