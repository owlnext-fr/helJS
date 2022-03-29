/**
 * A filter to remove-data url attributes on a string.
 */
export default class DataUrlContentFilter {

    /**
     * Removes data-url attributes from a given string.
     * @param haystack the string to filter.
     * @return string a filtered string without data-url attributes.
     */
    public static filter = (haystack: string): string => {
        if (-1 !== haystack.indexOf(',')) {
            haystack = (haystack.split(',').pop() as string);
        }

        return haystack;
    }

}