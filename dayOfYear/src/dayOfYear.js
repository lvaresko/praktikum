function dayOfYear(day, month, year) {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30,31, 30];
    let days = day;

    for (let i = 0; i < month-1; i++) {
        days += months[i];
    }

    if (month > 2 && isLeapYear(year)) days += 1;
   
    return days;
}

function isLeapYear(year) {
    return(!(year % 4) && (year % 100) || !(year % 400));
}

module.exports = dayOfYear;