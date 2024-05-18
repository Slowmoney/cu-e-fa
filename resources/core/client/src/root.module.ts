import { Module } from '@altv-mango/client';
import { NotifyModule } from './notify/notify.module';

@Module({ imports: [NotifyModule]})
export class RootModule {}
