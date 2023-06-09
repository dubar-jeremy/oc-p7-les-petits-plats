export class Collapsible {
  private collapsible: Element | null;
  private content: HTMLElement | null;
  private img: HTMLElement | null;

  constructor(collapsible: Element | null) {
    this.collapsible = collapsible;
    this.content = collapsible?.nextElementSibling as HTMLElement | null;
    this.img = collapsible?.querySelector(".arrow") as HTMLElement | null;

    this.initialize();
  }

  private initialize() {
    this.collapsible?.addEventListener("click", () => {
      this.collapsible?.classList.toggle("active");
      if (this.content) {
        if (this.content.style.maxHeight) {
          this.content.style.maxHeight = "";
          this.img?.classList.toggle("rotate-img");
        } else {
          this.content.style.maxHeight = `${this.content.scrollHeight}px`;
          this.img?.classList.toggle("rotate-img");
        }
      }
    });
  }
}

// <div>
// <div class=${type}>
//   <button class="collapsible-btn">Open Collapsible</button>
//   <img class="arrow" src="./public/Vector 1.svg" />
// </div>
// <div class="content">
//   <input type="text" placeholder="Search..">
//   ${data.map((item) => `<p>${item}</p>`).join("")}
// </div>
// </div>

// .collapsible-btn {
//   background: transparent;
//   color: rgb(24, 2, 2);
//   cursor: pointer;
//   padding: 18px;
//   border: none;
//   text-align: left;
//   outline: none;
//   font-size: 15px;
// }

// .collapsible:hover {
//   cursor: pointer;
// }

// .content {
//   padding: 0 18px;
//   max-height: 0;
//   overflow: hidden;
//   transition: max-height 0.2s ease-out;
//   background-color: #f1f1f1;
// }

// .rotate-img {
//   transform: rotate(180deg);
// }
