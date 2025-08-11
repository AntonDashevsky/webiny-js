export class GracefulError extends Error {
    static from(error: Error): GracefulError {
        return new GracefulError(error.message, {
            cause: error
        });
    }
}