import { Module } from '@altv-mango/server';
import { MinigameModule } from './minigame/minigame.module';

@Module({ imports: [MinigameModule]})
export class RootModule {}
