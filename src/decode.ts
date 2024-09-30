function hexToInt(hex: string): number {
  return Number.parseInt(hex, 16)
}

function utf8Decode(bytes: number[]): string {
  const list: string[] = []
  for (let i = 0; i < bytes.length; ) {
    if (bytes[i] < 128) {
      list.push(String.fromCharCode(bytes[i]))
      i++
    } else if (bytes[i] > 191 && bytes[i] < 224) {
      list.push(
        String.fromCharCode(((bytes[i] & 31) << 6) | (bytes[i + 1] & 63)),
      )
      i += 2
    } else if (bytes[i] > 223 && bytes[i] < 240) {
      list.push(
        String.fromCharCode(
          ((bytes[i] & 15) << 12) |
            ((bytes[i + 1] & 63) << 6) |
            (bytes[i + 2] & 63),
        ),
      )
      i += 3
    } else {
      const codePoint =
        ((bytes[i] & 7) << 18) |
        ((bytes[i + 1] & 63) << 12) |
        ((bytes[i + 2] & 63) << 6) |
        (bytes[i + 3] & 63)
      list.push(String.fromCodePoint(codePoint))
      i += 4
    }
  }
  return list.join("")
}

export function decodeURIComponent(encodedURI: string): string {
  const result: string[] = []
  let bytes: number[] = []
  for (let i = 0; i < encodedURI.length; i++) {
    if (encodedURI[i] === "%") {
      if (i + 2 < encodedURI.length) {
        const hex = encodedURI.slice(i + 1, i + 3)
        if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
          bytes.push(hexToInt(hex))
          i += 2
        } else {
          throw new URIError("URI malformed")
        }
      } else {
        throw new URIError("URI malformed")
      }
    } else {
      if (bytes.length > 0) {
        result.push(utf8Decode(bytes))
        bytes = []
      }
      result.push(encodedURI[i])
    }
  }

  if (bytes.length > 0) {
    result.push(utf8Decode(bytes))
  }

  return result.join("")
}
