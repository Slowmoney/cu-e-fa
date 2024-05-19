import * as native from "@altv/natives";
import type { Notifier } from "../interfaces/notifier.interface";

export class NativeNotifier implements Notifier {
    sendNotify(text: string): void {
        native.beginTextCommandThefeedPost('STRING');
        native.addTextComponentSubstringPlayerName(new Date().toLocaleTimeString() + ' ' + text);
        native.endTextCommandThefeedPostMessagetextTu(
            'CHAR_AMMUNATION'.toUpperCase(),
            'CHAR_AMMUNATION'.toUpperCase(),
            false,
            4,
            'Уведомление',
            '',
            1
        );
    }
}
