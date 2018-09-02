import { Painter } from './src/service/canvas/painter';
import { InfoBar } from './src/service/info-bar/info-bar';
import { AppService } from './src/application';
import { Dialog } from './src/service/dialog/dialog';
import { InputValidator } from './src/service/validator/input-validator';

const painter: Painter = new Painter('canvas');
const infoBar: InfoBar = new InfoBar('info-bar');
const dialog: Dialog = new Dialog();
const validator: InputValidator = new InputValidator();
const app: AppService = new AppService(painter, infoBar, dialog, validator);

app.init();

infoBar.onStartAgainClicked(() => {
  app.restart();
});
