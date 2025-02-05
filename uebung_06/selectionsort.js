function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}

onmessage = function(e){
    let a = [];
    for(let i = 0; i < e.data; i++){
        a.push(Math.random() * e.data);
    }

    var start = new Date().getTime();
    selectionSort(a);
    var end = new Date().getTime();
    var time = end - start;
    postMessage(time);
}

