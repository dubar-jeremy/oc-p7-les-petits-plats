import { initDomElements } from "./initDomElements";

initDomElements();

// just a test to make sure the input event is working
document.querySelector(".main-search-form")?.addEventListener("input", (e) => {
  console.log((e.target as HTMLInputElement)?.value);
});

document
  .querySelector("#ingredients-search")
  ?.addEventListener("input", (e) => {
    console.log((e.target as HTMLInputElement)?.value);
  });
