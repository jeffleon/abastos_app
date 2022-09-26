export function todayHelper(){
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    console.log(start);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    console.log(end);
    return {start,end};
}