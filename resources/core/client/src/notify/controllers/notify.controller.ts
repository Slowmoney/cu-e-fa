import { OnServer } from "@altv-mango/client";
import type { NotifyService } from "../services/notify.service";


export class NotifyController{
    constructor(private notifyService: NotifyService) {}
    @OnServer("notify")
    sendNotify(text: string) {
        this.notifyService.showNotification(text)
    }
}
