class Filter {
  private element: HTMLElement;
  private content: HTMLElement;
  private input: HTMLInputElement;
  private list: HTMLElement;
  private icon: HTMLElement;
  private border: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLElement;
    this.content = this.element.querySelector(
      `${selector}-content`
    ) as HTMLElement;
    this.input = this.content.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;

    this.list = this.content.querySelector(
      `${selector}-list-group`
    ) as HTMLElement;

    this.icon = document.querySelector(`${selector}-icon`) as HTMLElement;
    console.log(this.icon);

    this.border = document.querySelector(`${selector}-border`) as HTMLElement;

    // console.log(this.list);

    this.element.addEventListener("click", () => {
      this.content.classList.toggle("content-active");
      this.content.classList.toggle("content-inactive");
      this.icon.classList.toggle("icon-active");
      this.border.classList.toggle("border-rounded");
    });

    this.input.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.list.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("ok");
    });
  }
}

const ingredients = new Filter(".ingredients");
const appareils = new Filter(".appareils");
const ustensiles = new Filter(".ustentiles");

// const input = document.querySelector(".input-ingredients") as HTMLInputElement;

// // add event listener to input
// input.addEventListener("input", (event: Event) => {
//   const target = event.target as any;
//   console.log(target.value);
// });
