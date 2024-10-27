export const recursiveSearch = (arr: object, search: any, searchField: string, nestedKey: string) => {
    let nestedFlag = false;
    const findItemNested = (arr: object, search: any, searchField: string, nestedKey: string) => {
        if (nestedFlag) {
            return;
        }
        let elem: any;

        arr.forEach(item => {
            if (item[searchField] == search) {
                nestedFlag = true;
                elem = item;
            } else {
                if (!elem) elem = findItemNested(item[nestedKey], search, searchField, nestedKey);
            }
        }, null)

        return elem;
    };

    return findItemNested(arr, search, searchField, nestedKey);
}

export function expandNested(array, result = []) {
    for (const el of array) {
        result.push(el)

        if (el.children instanceof Array && el.children.length && el.children) {
            console.log('children');
            console.log(el.children);
            expandNested(el.children, result);
        }
    }

    return result;
}
