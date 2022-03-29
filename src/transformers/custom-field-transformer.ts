import {RedmineTS} from "redmine-ts";
import RedmineCustomFields from "../mappings/redmine-custom-fields";
import CustomField = RedmineTS.Common.CustomField;

/**
 * A helper to transform CreateIssuePayload fields into Redmine API CustomField.
 */
export default class CustomFieldTransformer {

    /**
     * Transform CreateIssuePayload fields into Redmine API CustomField.
     * @param fields A CreateIssuePayload to transform.
     * @return CustomField[] an array containing all custom fields set for Redmine API.
     */
    public static transform = (fields: CreateIssuePayload): CustomField[] => {
        const custom_fields: CustomField[] = [];

        if (typeof fields.reporter_identity !== 'undefined') {
            custom_fields.push({
                id: RedmineCustomFields.REPORTER_IDENTITY,
                value: fields.reporter_identity
            });
        }

        if (typeof fields.url !== 'undefined') {
            custom_fields.push({
                id: RedmineCustomFields.URL,
                value: fields.url
            });
        }

        if (typeof fields.session_data !== 'undefined') {
            custom_fields.push({
                id: RedmineCustomFields.SESSION_DATA,
                value: fields.session_data
            });
        }

        if (typeof fields.stack_trace !== 'undefined') {
            custom_fields.push({
                id: RedmineCustomFields.STACK_TRACE,
                value: fields.stack_trace
            });
        }

        if (typeof fields.additional_data !== 'undefined') {
            let data = fields.additional_data;

            if(typeof data !== 'string') {
                data = JSON.stringify(data);
            }

            custom_fields.push({
                id: RedmineCustomFields.ADDITIONAL_DATA,
                value: data
            });
        }

        return custom_fields;
    }
}