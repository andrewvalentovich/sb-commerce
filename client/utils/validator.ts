export function onlyNumber (event: Event) {
    let keyCode = (event.keyCode ? event.keyCode : event.which);
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        event.preventDefault();
    }
}
