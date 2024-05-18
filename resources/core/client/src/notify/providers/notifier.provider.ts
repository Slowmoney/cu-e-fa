import type { Provider } from "@altv-mango/core"
import { NativeNotifier } from "../services/native-notifier"


export const NOTIFIER = Symbol("NOTIFIER")
export const notifierProvider: Provider = {
    provide: NOTIFIER,
    useFactory() {
        return new NativeNotifier()
    }
}
