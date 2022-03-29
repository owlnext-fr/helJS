import ErrorPayload from "../utils/error-payload";

/**
 * A helper to transform generic errors into readable errors.
 */
export default class ErrorMessageTransformer {
    /**
     * Transforms error payloads into readable errors.
     * @param error An ErrorPayload to transform.
     * @return string the readable error extracted from the given ErrorPayload.
     */
    public static transform = (error: ErrorPayload): string => {
        return `[HelJS - HTTP ${error.code}]: ${error.message} (${error.type})`;
    }
}