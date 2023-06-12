export function createFilter(selector: string): void {
  const element = document.querySelector(selector) as HTMLElement;
  const content = element.querySelector(`${selector}-content`) as HTMLElement;
  const input = content.querySelector('input[type="text"]') as HTMLInputElement;
  const list = content.querySelector(`${selector}-list-group`) as HTMLElement;
  const icon = document.querySelector(`${selector}-icon`) as HTMLElement;

  element.addEventListener("click", () => {
    content.classList.toggle("content-active");
    content.classList.toggle("content-inactive");
    icon.classList.toggle("icon-active");
  });

  input.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  list.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("ok");
  });
}
