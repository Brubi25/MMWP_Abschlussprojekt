let sum = 0;
for(let i = 0; i < 1000000000; i++){
    sum += Math.random() * 1000000;
}
postMessage(sum);
