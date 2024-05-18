import { Module } from "@altv-mango/core";
import { NotifyController } from "./controllers/notify.controller";
import { NotifyService } from "./services/notify.service";
import { notifierProvider } from "./providers/notifier.provider";


@Module({ controllers: [NotifyController], providers: [NotifyService, notifierProvider]})
export class NotifyModule{}
