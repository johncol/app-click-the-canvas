import { Painter } from './src/service/canvas/painter';
import { InfoBar } from './src/service/info-bar/info-bar';
import { AppService } from './src/application';
import { Dialog } from './src/service/dialog/dialog';

const painter: Painter = new Painter('canvas');
const infoBar: InfoBar = new InfoBar('info-bar');
const dialog: Dialog = new Dialog();
const app: AppService = new AppService(painter, infoBar, dialog);

app.init();

infoBar.onStartAgainClicked(() => {
  app.restart();
});
