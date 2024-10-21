export function isEmpty(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && obj[i] != '{' && obj[i] != '}') {
            return false;
        }
    }
    return true;
}
