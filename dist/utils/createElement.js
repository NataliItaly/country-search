export default function createElement(tag, attributes, text) {
    const element = document.createElement(tag);
    for (const [attr, value] of Object.entries(attributes)) {
        element.setAttribute(attr, value);
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}
//# sourceMappingURL=createElement.js.map