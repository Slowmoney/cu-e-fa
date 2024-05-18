import { Module } from "@altv-mango/core";
import { MinigameService } from "./services/minigame.service";
import { PlayerModule } from "../player/player.module";
import { MinigameController } from "./controllers/minigame.contoller";
import { NotifyModule } from "../notify/notify.module";
import { minigameRepositoryProvider } from "./providers/minigame-repository.provider";


@Module({ controllers: [MinigameController], providers: [MinigameService, minigameRepositoryProvider], imports: [PlayerModule, NotifyModule]})
export class MinigameModule{}
