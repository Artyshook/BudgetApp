interface IMongoError {
    code: number;
    keyPattern?: {
        nickname?: boolean;
    };
}

export function isMongoError(error: unknown): error is IMongoError {
    const potentialError = error as IMongoError;
    return !!potentialError && typeof potentialError.code === 'number' && !!potentialError.keyPattern && typeof potentialError.keyPattern.nickname === 'boolean';
}
