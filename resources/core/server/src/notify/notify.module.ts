import { Module } from "@altv-mango/core";
import { PlayerModule } from "../player/player.module";
import { notifyRepositoryProvider } from "./providers/notify-repository.provider";
import { NotifyService } from "./services/notify.service";

@Module({ imports: [PlayerModule], providers: [NotifyService, notifyRepositoryProvider], exports: [NotifyService] })
export class NotifyModule {}
