import { throwError, UnreservedChars } from "./share"

function charToUtf8(char: string): number[] {
  const codePoint = char.codePointAt(0)!

  if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
    throwError()
  }

  if (codePoint < 128) {
    return [codePoint]
  }
  if (codePoint < 0x800) {
    const v1 = 0xc0 | (codePoint >> 6)
    const v2 = 0x80 | (codePoint & 0x3f)
    return [v1, v2]
  }
  if (codePoint < 0x10000) {
    const v1 = 0xe0 | (codePoint >> 12)
    const v2 = 0x80 | ((codePoint >> 6) & 0x3f)
    const v3 = 0x80 | (codePoint & 0x3f)
    return [v1, v2, v3]
  }
  if (codePoint <= 0x10ffff) {
    const v1 = 0xf0 | (codePoint >> 18)
    const v2 = 0x80 | ((codePoint >> 12) & 0x3f)
    const v3 = 0x80 | ((codePoint >> 6) & 0x3f)
    const v4 = 0x80 | (codePoint & 0x3f)
    return [v1, v2, v3, v4]
  }

  throwError()
}

export function encodeURIComponent(str: string): string {
  const list: string[] = []
  for (const char of str) {
    if (UnreservedChars.indexOf(char) !== -1) {
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
