import { Painter } from './src/service/canvas/painter';
import { InfoBar } from './src/service/info-bar/info-bar';
import { AppService } from './src/application';

const painter: Painter = new Painter('canvas');
const infoBar: InfoBar = new InfoBar('info-bar');
const app: AppService = new AppService(painter, infoBar);

app.init();

infoBar.onStartAgainClicked(() => {
  app.restart();
});
