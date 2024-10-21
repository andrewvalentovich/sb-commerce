export function isTouchDevice(): boolean {
    return process.client ? ('ontouchstart' in window) : false
}

export function bodyFixed() {
    if (process.server) return

    if (isTouchDevice()) {
        document.body.classList.add('fixed')
    } else {
        let x = window.scrollX
        let y = window.scrollY
        window.onscroll = function () {
            window.scrollTo(x, y)
        }
    }
}

export function bodyNotFixed() {
    if (process.server) return

    if (isTouchDevice()) {
        document.body.classList.remove('fixed')
    } else {
        window.onscroll = function () {
            window.scrollTo()
        }

    }
}

export function createBinaryFromFile(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = resolve;
        reader.onerror = reject;
        reader.readAsBinaryString(file);
    })
}

export function createReaderFromFile(file: File, method: string = 'readAsDataURL'): Promise<ProgressEvent<FileReader>> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = resolve;
        reader.onerror = reject;
        // @ts-ignore
        reader[method](file);
    })
}

export function popupWindowOpen(url: string, title: string, w: number = 800, h: number = 600) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`);
}
