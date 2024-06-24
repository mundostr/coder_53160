process.on('message', message => {
    let result = 0;
    for (let i = 0; i <= 3e9; i++ ) result += i // 3 000 000 000
    // return result;
    process.send(result);
});
