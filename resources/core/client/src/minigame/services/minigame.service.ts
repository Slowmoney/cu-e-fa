import type { EventService } from "@altv-mango/client";
import { EVENT_SERVICE, Inject, Injectable } from "@altv-mango/core";
import { HandState } from "@shared";

@Injectable()
export class MinigameService{
    constructor(@Inject(EVENT_SERVICE) private eventService: EventService) {}
    startGame() {
       this.eventService.emitServer("minigame:start")
    }

    sendHandState(newHandState: HandState) {
       this.eventService.emitServer("minigame:hand::set", newHandState)
    }
}
