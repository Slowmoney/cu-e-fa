import { Module } from "@altv-mango/core";
import { MinigameService } from "./services/minigame.service";
import { MinigameController } from "./controllers/minigame.controller";


@Module({
    controllers: [MinigameController],
    providers: [MinigameService]
})
export class MinigameModule{}
