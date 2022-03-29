/**
 * A screenshot representation for Redmine.
 */
declare interface Screenshot {
    /**
     * The screenshot's filename.
     */
    name: string;
    /**
     * The screenshot's content.
     */
    content: string;
    /**
     * The screenshot's content type. Must be valid with MIME types and 'Content-Type' headers.
     */
    content_type: string;
    /**
     * A token used by redmine to identify the screenshot. This token will be provided by Redmine upon upload, and thus
     * should not be filled manually.
     */
    token?: string | null;
}

/**
 * A payload to create an issue.
 */
declare interface CreateIssuePayload {
    /**
     * Subject of the issue.
     */
    subject: string;
    /**
     * Description of the issue.
     */
    description: string;
    /**
     * Identity of the issue's reporter.
     */
    reporter_identity: string;
    /**
     * URL of the issue.
     */
    url?: string;
    /**
     * Session data regarding the issue.
     */
    session_data?: string;
    /**
     * Stack trace or execution trace related to the issue.
     */
    stack_trace?: string;
    /**
     * A list of screenshots to add to the issue.
     */
    screenshots?: Array<Screenshot>;
    /**
     * An object with additional data. Please ensure that this object is JSON serializable.
     */
    additional_data?: any;
}

/**
 * An ID + name pair from Redmine API.
 */
declare interface IdNamePair {
    /**
     * Identifier of the ressource.
     */
    id: number,
    /**
     * Name (value) of the ressource.
     */
    name: string
}

/**
 * An ID + value pair from Redmine API.
 */
declare interface IdValuePair {
    /**
     * Identifier of the ressource.
     */
    id: number,
    /**
     * Value of the ressource.
     */
    value: string
}

/**
 * An issue from Redmine API.
 */
declare interface Issue {
    /**
     * Identifier of the issue.
     */
    id: number,
    /**
     * Project of the issue.
     */
    project: IdNamePair,
    /**
     * Tracker of the issue.
     */
    tracker: IdNamePair,
    /**
     * Status of the issue.
     */
    status: IdNamePair,
    /**
     * Priority of the issue.
     */
    priority: IdNamePair,
    /**
     * Author of the issue.
     */
    author: IdNamePair,
    /**
     * Subject of the issue.
     */
    subject: string,
    /**
     * Description text of the issue.
     */
    description: string,
    /**
     * Starting date (creation) of the issue.
     */
    start_date: string,
    /**
     * Due date for the issue.
     */
    due_date: string | null,
    /**
     * Ratio of completion for issue resolution.
     */
    done_ratio: number,
    /**
     * Either the issue is private to the current user or not.
     */
    is_private: boolean,
    /**
     * Number of hours to solve the issue.
     */
    estimated_hours: number | null,
    /**
     * Total number of hours to solve the issue.
     */
    total_estimated_hours: number | null,
    /**
     * A list of custom fields for the issue.
     */
    custom_fields: Array<IdValuePair>,
    /**
     * Creation date of the issue.
     */
    created_on: string,
    /**
     * Update date of the issue.
     */
    updated_on: string,
    /**
     * Close date of the issue.
     */
    closed_on: string | null
}