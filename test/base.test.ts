import { expect, test } from "vitest"
import {
  encodeURIComponent as encode,
  decodeURIComponent as decode,
} from "../src"

const data = [
  "hello",
  "hello 你好",
  "🌏",
  "hello 🌍🌎🌏",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*'()",
  "☃★♲",
  "Hello, 世界! 🌍'",
  "%",
  "%%%",
  "%25",
  "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  "\uD800\uDFFF",
]

test("encode", () => {
  for (const i of data) {
    expect(encode(i)).toEqual(encodeURIComponent(i))
  }
})

test("decode", () => {
  for (const i of data) {
    expect(decode(encodeURIComponent(i))).toEqual(i)
  }
})
