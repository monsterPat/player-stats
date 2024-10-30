export default function sortArray(arr, fields){
    if(fields.length == 1){
        return arr.sort((a,b) => {
            return a[fields[0].name].localeCompare(b[fields[0].name]);
        });
    }else{
        return arr.sort((a,b) => {
            const dateA = new Date(a[fields[0].name]);
            const dateB = new Date(b[fields[0].name]);
            
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            
            // If dates are equal, compare by name
            return a[fields[1].name].localeCompare(b[fields[1].name]);
        });
    }

}