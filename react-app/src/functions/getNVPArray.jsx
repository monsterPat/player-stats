export default function getNVPArray(arr, nameAttr, valueAttr, nameName, valueName){
    let tempNVPArr = arr.map((o) => {
        const tempNVP = {};
        tempNVP[nameName] = o[nameAttr];
        tempNVP[valueName] = o[valueAttr];
        return tempNVP;
    });
    return tempNVPArr;
}