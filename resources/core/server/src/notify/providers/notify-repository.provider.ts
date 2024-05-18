import type { Provider } from "@altv-mango/core";
import { AltvNotifyRepositoryImpl } from "../repositories/altv-notify.repository";
export const NOTIFY_REPOSITORY = Symbol("NOTIFY_REPOSITORY")

export const notifyRepositoryProvider: Provider = {
    provide: NOTIFY_REPOSITORY,
    useFactory() {
        return new AltvNotifyRepositoryImpl()
    }
}
