export default function isValidUrl(url: string | null): boolean {
    if (!url) return false;
    // Regex pattern for a robust URL check
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}