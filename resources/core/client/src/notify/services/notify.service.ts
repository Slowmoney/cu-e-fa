import type { Notifier } from "../interfaces/notifier.interface";
import { Inject, Injectable } from "@altv-mango/core";
import { NOTIFIER } from "../providers/notifier.provider";

@Injectable()
export class NotifyService {
    constructor(@Inject(NOTIFIER) private notifier: Notifier){}
    showNotification(text: string) {
        this.notifier.sendNotify(text)
    }
}
