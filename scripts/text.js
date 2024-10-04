function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = parseInt(time % 3600);
    const minutes = parseInt(remainingSecond/60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minutes} minutes ${remainingSecond} ago`;
}

const result = getTimeString(30000000)
console.log(result)