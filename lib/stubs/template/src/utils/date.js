"use strict";

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

module.exports = {
    /**
     * 
     * @param {Date} dateObj
     * @returns {String} Formatted as October 15, 2022
     */
    getFriendlyFormat: (dateObj) => {
        const month = MONTH_NAMES[dateObj.getMonth()];
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month} ${date}, ${year}`;
    }
};
