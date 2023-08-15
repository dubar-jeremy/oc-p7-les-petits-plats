function advancedSearch(e) {
    const itemValue = e.target.value.toLowerCase();
    const inputName = e.target.name;
    const originalList = document.querySelectorAll(`.${inputName}-list-group li:not([havebeenclicked])`);
  
    if (itemValue.length < 3) {
      // Remove all d-none class
      originalList.forEach(item => item.classList.remove('d-none'));
      return;
    }
  
    // Hide elements that don't match the original search
    originalList.forEach(item => {
      if (item.textContent.toLowerCase().indexOf(itemValue) === -1) {
        item.classList.add('d-none');
      } else {
        item.classList.remove('d-none');
      }
    });
  }
  
  export { advancedSearch };
  