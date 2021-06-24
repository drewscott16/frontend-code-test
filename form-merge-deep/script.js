/*
  const shipping = {
        street: {
            name: "Katydid",
            number: "123"
        },
        zipcode: "98102",
        contact: {
            phone: {
                area: "206",
                exchange: "123",
                subscriber: "ABC"
            }
        }
    }
*/

/* I did not write mergeDeep */
/* This is the part I got stuck on */
//https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(...objects) {
    const isObject = (obj) => obj && typeof obj === "object";
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}

const formatFormData = (root) => {
    const input = root.querySelectorAll("input");
    let obj = {};

    input.forEach((item) => {
        let keys = item.name.split(".");
        let last = {};

        for (let i = keys.length - 1; i >= 0; i--) {
            if (last.hasOwnProperty(keys[i + 1])) {
                last = { [keys[i]]: last };
            } else {
                last = { [keys[i]]: item.value };
            }
        }

        obj = mergeDeep(obj, last);
    });

    return obj;
};

const extra = formatFormData(document.getElementById("extra"));
const shipping = formatFormData(document.getElementById("shipping"));

document.getElementById("first-output").textContent = JSON.stringify(extra, null, 4);
document.getElementById("second-output").textContent = JSON.stringify(shipping, null, 4);

console.log(extra);
console.log(shipping);
