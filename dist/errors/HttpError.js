export class HttpError extends Error {
    status;
    constructor(status) {
        super(`HTTP error: ${status}`);
        this.name = 'HttpError';
        this.status = status;
    }
}
//# sourceMappingURL=HttpError.js.map