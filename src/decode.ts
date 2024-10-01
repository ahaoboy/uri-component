import { getIntFromHex, throwError, UnreservedChars, utf8Decode } from "./share"

export function decodeURIComponent(encodedURI: string): string {
  const result: string[] = []
  const len = encodedURI.length
  let i = 0
  while (i < len) {
    const c = encodedURI[i]
    if (UnreservedChars.includes(c)) {
      result.push(c)
      i++
    } else if (c === "%") {
      const v1 = getIntFromHex(encodedURI, i + 1)
      if (v1 < 128) {
        result.push(utf8Decode([v1]))
        i += 3
      } else if (v1 >> 5 === 6) {
        if (i + 6 > len || encodedURI[i + 3] !== "%") {
          throwError()
        }
        const v2 = getIntFromHex(encodedURI, i + 4)
        if (v2 >> 6 !== 2) {
          throwError()
        }
        result.push(utf8Decode([v1, v2]))
        i += 6
      } else if (v1 >> 4 === 14) {
        if (
          i + 9 > len ||
          encodedURI[i + 3] !== "%" ||
          encodedURI[i + 6] !== "%"
        ) {
          throwError()
        }
        const v2 = getIntFromHex(encodedURI, i + 4)
        if (v2 >> 6 !== 2) {
          throwError()
        }
        const v3 = getIntFromHex(encodedURI, i + 7)
        if (v3 >> 6 !== 2) {
          throwError()
        }
        result.push(utf8Decode([v1, v2, v3]))
        i += 9
      } else if (v1 >> 3 === 30) {
        if (
          i + 12 > len ||
          encodedURI[i + 3] !== "%" ||
          encodedURI[i + 6] !== "%" ||
          encodedURI[i + 9] !== "%"
        ) {
          throwError()
        }
        const v2 = getIntFromHex(encodedURI, i + 4)
        if (v2 >> 6 !== 2) {
          throwError()
        }
        const v3 = getIntFromHex(encodedURI, i + 7)
        if (v3 >> 6 !== 2) {
          throwError()
        }
        const v4 = getIntFromHex(encodedURI, i + 10)
        if (v4 >> 6 !== 2) {
          throwError()
        }
        result.push(utf8Decode([v1, v2, v3, v4]))
        i += 12
      } else {
        throwError()
      }
    } else {
      throwError()
    }
  }
  return result.join("")
}
