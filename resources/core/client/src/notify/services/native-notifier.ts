import * as native from "@altv/natives";
import type { Notifier } from "../interfaces/notifier.interface";

export class NativeNotifier implements Notifier {
    sendNotify(text: string): void {
        native.beginTextCommandThefeedPost('STRING');
        native.addTextComponentSubstringPlayerName(text);
        native.endTextCommandThefeedPostMpticker(false, true);
    }
}
