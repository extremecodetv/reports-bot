module.exports = (text, tags) => {
    if (!text) {
        return false;
    }

    text = text.toLowerCase(); //eslint-disable-line
    let is = false;
    tags.forEach(h => {
        is = is || (text.indexOf(`#${h}`) >= 0);
    });

    return is;
};
