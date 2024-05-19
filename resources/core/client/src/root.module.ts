import { Module } from '@altv-mango/client';
import { NotifyModule } from './notify/notify.module';
import { MinigameModule } from './minigame/minigame.module';

@Module({ imports: [NotifyModule, MinigameModule]})
export class RootModule {}
