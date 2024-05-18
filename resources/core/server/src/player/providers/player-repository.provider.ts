import type { Provider } from "@altv-mango/core"
import { AltvPlayerRepositoryImpl } from "../repositories/altv-player.repository"


export const PLAYER_REPOSITORY = Symbol("PLAYER_REPOSITORY")
export const playerRepositoryProvider: Provider = {
    provide: PLAYER_REPOSITORY,
    useFactory() {
        return new AltvPlayerRepositoryImpl()
    }
}
