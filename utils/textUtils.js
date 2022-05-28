const rupiahFormat = (num) => {
    return (num).toFixed(0).replace('.', ',').replace(/./g, function (c, i, a) {
        return i && c !== "," && !((a.length - i) % 3) ? '.' + c : c;
    });
}

module.exports = {
    rupiahFormat,
};