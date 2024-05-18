import type { Provider } from "@altv-mango/core";
import { MinigameRepositoryImpl } from "../repositories/minigame.repository";
export const MINIGAME_REPOSITORY = Symbol("MINIGAME_REPOSITORY")

export const minigameRepositoryProvider: Provider = {
    provide: MINIGAME_REPOSITORY,
    useFactory() {
        return new MinigameRepositoryImpl()
    }
}
