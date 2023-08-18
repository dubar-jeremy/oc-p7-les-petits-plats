/**
 * This function returns an id for an element
 * It takes a string in parameter
 * It returns a string with no spaces, no accents, no apostrophes, no uppercase
 * exemple:  Pâte à crêpes" returns "pate-a-crepes"
 */
export function getElementId(element) {
    return element
        .replace(/'/g, '_')
        .replace(/\s/g, '-')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
}