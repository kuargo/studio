/**
 * @fileOverview A service for interacting with external Bible APIs.
 */

/**
 * Looks up the text of a given Bible passage using a public API.
 * @param passage - The scripture reference (e.g., "John 3:16").
 * @returns A string containing the text of the passage.
 */
export async function lookupScripture(passage: string): Promise<string> {
    try {
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(passage)}?translation=kjv`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        if (data.error) {
            return `Error fetching scripture: ${data.error}`;
        }
        
        // The API returns verses in an array, join them together.
        const formattedText = data.verses.map((v: any) => `[${v.verse}] ${v.text}`).join(' ').replace(/\n/g, ' ');
        return formattedText || "Passage not found or could not be retrieved.";
    } catch (error) {
        console.error("Error looking up scripture:", error);
        return "An error occurred while trying to look up the scripture.";
    }
}
