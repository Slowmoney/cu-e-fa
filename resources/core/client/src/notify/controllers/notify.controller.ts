import { Body, Controller, Inject, OnServer } from "@altv-mango/client";
import { NotifyService } from "../services/notify.service";

@Controller()
export class NotifyController{
    constructor(@Inject(NotifyService) private notifyService: NotifyService) {}
    @OnServer("notify")
    sendNotify(@Body() text: string) {
        this.notifyService.showNotification(text)
    }
}
