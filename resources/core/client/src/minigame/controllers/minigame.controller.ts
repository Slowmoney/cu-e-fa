import { OnKeyDown, OnKeyUp, type MangoRequest,  } from "@altv-mango/client";
import { Body, Controller, Inject, Request } from "@altv-mango/core";
import * as alt from "@altv/client";
import { MinigameService } from "../services/minigame.service";
import { HandState } from "@shared/enums";

@Controller()
export class MinigameController {
    constructor(@Inject(MinigameService) private minigameService: MinigameService) {}
    @OnKeyDown()
    onKeyDown(@Body() keyCode: alt.Events.KeyUpDownEventParameters) {
        if (keyCode.key === alt.Enums.KeyCode.J) {
            this.minigameService.startGame()
        } else if (keyCode.key === alt.Enums.KeyCode.KEY1) {
            this.minigameService.sendHandState(HandState.Rock)
        } else if (keyCode.key === alt.Enums.KeyCode.KEY2) {
            this.minigameService.sendHandState(HandState.Scissors)
        } else if (keyCode.key === alt.Enums.KeyCode.KEY3) {
            this.minigameService.sendHandState(HandState.Paper)
        }
    }
}

alt.Events.onKeyUp((e)=>{})
