function UTCDate() {
    const start = new Date()
    return new Date(start.getTime() + start.getTimezoneOffset() * 60000);   
}

export function todayHelper(){  
    const start = UTCDate()
    const end = UTCDate()
    start.setHours(0,0,0,0);
    end.setHours(23, 59, 59, 999);
    return {start,end};
}