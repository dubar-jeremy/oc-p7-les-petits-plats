
function advancedSearch(e) {
    const itemValue = e.target.value.toLowerCase()

    const inputName = e.target.name

    const originalList = document.querySelectorAll(`.${inputName}-list-group li:not([havebeenclicked])`);

    if (itemValue.length < 3) {
        // remove all d-none class
        for (let i = 0; i < originalList.length; i++) {
            originalList[i].classList.remove('d-none')
        }
        return
    }

    // hide element that don't match the original search
    for (let i = 0; i < originalList.length; i++) {
        if (originalList[i].textContent.toLowerCase().indexOf(itemValue) === -1) {
            originalList[i].classList.add('d-none')
        } else {
            originalList[i].classList.remove('d-none')
        }
    }

    for (let i = 0; i < originalList.length; i++) {
        originalList[i].addEventListener('click', function() {            
            // Supprimer la classe 'd-none' des autres éléments non cliqués
            for (let j = 0; j < originalList.length; j++) {
                if (j !== i) {
                    originalList[j].classList.remove('d-none');
                }
            }
        });
    }
}
export { advancedSearch }
