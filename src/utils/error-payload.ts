/**
 * An error payload bean/class.
 */
export default class ErrorPayload {
    /**
     * The error code number.
     * @private
     */
    private readonly _code: number;
    /**
     * The error type (short message).
     * @private
     */
    private readonly _type: string;
    /**
     * The error message.
     * @private
     */
    private readonly _message: string;

    /**
     * Constructs a payload from an Error.
     * @param error the Error to handle.
     */
    public constructor(error: Error) {
        this._code = 0;
        this._type = 'Axios error';
        this._message = error.toString();
    }

    /**
     * Gets the error code number.
     * @return number the error code number.
     */
    public get code(): number {
        return this._code;
    }

    /**
     * Gets the error type (short message).
     * @return string the error type (short message).
     */
    public get type(): string {
        return this._type;
    }

    /**
     * Gets the error message.
     * @return string the error message.
     */
    public get message(): string {
        return this._message;
    }
}