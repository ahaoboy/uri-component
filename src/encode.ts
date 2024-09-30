function charToUtf8(char: string): number[] {
  const codePoint = char.codePointAt(0)!
  if (codePoint < 0x80) {
    return [codePoint]
  }
  if (codePoint < 0x800) {
    return [0xc0 | (codePoint >> 6), 0x80 | (codePoint & 0x3f)]
  }
  if (codePoint < 0x10000) {
    return [
      0xe0 | (codePoint >> 12),
      0x80 | ((codePoint >> 6) & 0x3f),
      0x80 | (codePoint & 0x3f),
    ]
  }
  return [
    0xf0 | (codePoint >> 18),
    0x80 | ((codePoint >> 12) & 0x3f),
    0x80 | ((codePoint >> 6) & 0x3f),
    0x80 | (codePoint & 0x3f),
  ]
}

export function encodeURIComponent(str: string): string {
  const unreservedChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*'()"
  const list: string[] = []
  for (const char of str) {
    if (unreservedChars.indexOf(char) !== -1) {
      list.push(char)
    } else {
      const s = charToUtf8(char)
        .map((i) => `%${i.toString(16).padStart(2, "0").toUpperCase()}`)
        .join("")
      list.push(s)
    }
  }

  return list.join("")
}
