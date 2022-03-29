/**
 * Configuration payload for Hel.
 */
declare interface HelConfig {
    /**
     * Base URL for Redmine API.
     */
    api_url: string;
    /**
     * API key for Redmine API.
     */
    api_key: string;
    /**
     * Project identifier for issue report.
     */
    project_id: number;
}