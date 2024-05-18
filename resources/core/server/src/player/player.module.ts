import { Module } from "@altv-mango/core";
import { PlayerService } from "./services/player.service";
import { playerRepositoryProvider } from "./providers/player-repository.provider";


@Module({providers:[PlayerService, playerRepositoryProvider],exports:[PlayerService]})
export class PlayerModule{}
