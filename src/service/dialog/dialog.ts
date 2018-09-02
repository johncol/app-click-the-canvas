export class Dialog {
  private static readonly DEFAULT: string = 'The points you selected cannot be used to build a parallelogram';
  
  private readonly dialog: HTMLDialogElement;
  private readonly message: HTMLElement;

  constructor() {
    this.dialog = document.getElementsByTagName('dialog')[0] as HTMLDialogElement;
    this.message = this.dialog.children.item(0) as HTMLElement;
  }

  show(error: Error = { message: Dialog.DEFAULT } as Error): void {
    this.message.innerHTML = error.message;
    this.dialog.classList.toggle('open');
    setTimeout(() => this.dialog.classList.toggle('open'), 3500);
  }

}
