export function isUpperCamelCase(str: string): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(str)
}
