
const _ = require('lodash');
const utils = {};

utils.formatDateToString = (dateString) => {
    const d = new Date(dateString);
    return !isNaN(d.getDate()) && `${d.toDateString()} ${d.toTimeString()}`;
}

module.exports = utils;