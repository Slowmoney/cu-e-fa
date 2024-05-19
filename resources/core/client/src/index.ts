import '@abraham/reflection';
import { RootModule } from './root.module';
import { createAppBuilder } from '@altv-mango/client';

const appBuilder = await createAppBuilder();
const app = await appBuilder.build();
await app.start(RootModule);
