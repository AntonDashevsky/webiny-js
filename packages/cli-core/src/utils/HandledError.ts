export class HandledError extends Error {
    static from(error: Error): HandledError {
        return new HandledError(error.message, {
            cause: error
        });
    }
}
