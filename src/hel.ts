import {Redmine, RedmineTS} from "redmine-ts";
import RedmineTrackerConstants from "./mappings/redmine-tracker-constants";
import CustomFieldTransformer from "./transformers/custom-field-transformer";
import HelException from "./exception/hel-exception";
import ErrorMessageTransformer from "./transformers/error-message-transformer";
import ErrorPayload from "./utils/error-payload";
import DataUrlContentFilter from "./filters/data-url-content-filter";

/**
 * Hel Redmine connector.
 */
export default class Hel {
    /**
     * Hel configuration.
     * @private
     */
    private readonly _configuration: HelConfig;
    /**
     * Redmine API connector.
     * @private
     */
    private readonly _api: Redmine;

    /**
     * Hel constructor.
     * @param configuration the Hel configuration.
     */
    public constructor(configuration: HelConfig) {
        this._configuration = configuration;
        this._api = new Redmine(this._configuration.api_url, {
            apiKey: this._configuration.api_key
        });
    }

    /**
     * Creates an issue on Redmine.
     * @param payload A CreateIssuePayload payload to create the issue.
     * @return Promise<Issue | void> A promise with the created issue, or void on error.
     * @throws HelException if any error occurs while sending data to Redmine.
     */
    public createIssue = async (payload: CreateIssuePayload): Promise<Issue | void> => {
        const final_screenshots: Screenshot[] = [];

        if (typeof payload.screenshots !== "undefined") {
            for (const screenshot of payload.screenshots) {
                const filtered_screenshot_content = DataUrlContentFilter.filter(screenshot.content);

                try {
                    const response = await this._api.uploadFile(Buffer.from(filtered_screenshot_content, "base64"));
                    final_screenshots.push({
                        content: screenshot.content,
                        content_type: screenshot.content_type,
                        name: screenshot.name,
                        token: response.upload.token
                    });
                } catch (error) {
                    throw new HelException(ErrorMessageTransformer.transform(new ErrorPayload(<Error> error)))
                }
            }
        }

        const issue: RedmineTS.Issues.CreateParams = {
            project_id: this.configuration.project_id,
            subject: payload.subject,
            description: payload.description,
            tracker_id: RedmineTrackerConstants.ISSUE_TRACKER_ID,
            custom_fields: CustomFieldTransformer.transform(payload)
        };

        if (final_screenshots.length > 0) {
            const uploads: RedmineTS.Common.Upload[] = [];

            for(const screenshot of final_screenshots) {
                uploads.push(<RedmineTS.Common.Upload>{
                    content_type: screenshot.content_type,
                    filename: screenshot.name,
                    token: screenshot.token
                });
            }

            issue.uploads = uploads;
        }

        let issue_response;

        try {
            issue_response = await this._api.createIssue(issue);
        } catch (error) {
            throw new HelException(ErrorMessageTransformer.transform(new ErrorPayload(<Error> error)))
        }

       return <Issue> issue_response.issue;
    }

    /**
     * Hel configuration accessor.
     * @return HelConfig the Hel configuration.
     */
    public get configuration(): HelConfig {
        return this._configuration;
    }
}