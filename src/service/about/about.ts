export class About {
  private static readonly SHOW_BOX = 'about-info--open';

  private readonly section: HTMLElement;

  constructor(sectionId: string) {
    this.section = document.getElementById(sectionId) as HTMLElement;
    (this.section.querySelector('[data-close]') as HTMLButtonElement)
      .addEventListener('click', this.hide);
  }

  hide: () => void = (): void => {
    this.section.classList.remove(About.SHOW_BOX);
  }

  toggle: () => void = (): void => {
    this.section.classList.toggle(About.SHOW_BOX);
  }
}
