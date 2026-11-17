export default function getYear() {
    const now = new Date();
    const yearContainer = document.getElementById('year');
    if (yearContainer) {
        yearContainer.textContent = String(now.getFullYear());
    }
}
//# sourceMappingURL=getYear.js.map