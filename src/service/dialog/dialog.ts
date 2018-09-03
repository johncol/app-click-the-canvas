export class Dialog {
  private static readonly DEFAULT: string = 'The points you selected cannot be used to build a parallelogram';

  private readonly dialog: HTMLDialogElement;
  private readonly message: HTMLElement;

  constructor(dialogId: string) {
    this.dialog = document.getElementById(dialogId) as HTMLDialogElement;
    this.message = this.dialog.children.item(0) as HTMLElement;
  }

  show(error: Error = { message: Dialog.DEFAULT } as Error): void {
    this.message.innerHTML = error.message;
    this.toggleDialog();
    setTimeout(this.toggleDialog, 3500);
  }

  private toggleDialog: () => void = (): void => {
    this.dialog.classList.toggle('dialog--open');
  }

}
