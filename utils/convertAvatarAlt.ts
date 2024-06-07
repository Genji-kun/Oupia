export function convert(fullName: string): string {
    if (fullName) {
        let words = fullName.split(' ');
        let name = words[0].charAt(0) + words[words.length - 1].charAt(0);
        return name.toUpperCase();
    }
    return "";
}