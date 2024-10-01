import { expect, test } from "vitest"
import {
  encodeURIComponent as encode,
  decodeURIComponent as decode,
} from "../src"

const encodeData = [
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

const encodeError = ["\uD800"]

const decodeData = ["%25", "st%C3%A5le", "%C2%B5", "%F0%9F%8C%8F"]

const decodeError = [
  "%",
  "%st%C3%A5le%",
  "%%7Bst%C3%A5le%7D%",
  "%7B%ab%%7C%de%%7D",
  "%FE%FF",
  "%C2",
]

test("encode", () => {
  for (const i of encodeData) {
    expect(encode(i)).toEqual(encodeURIComponent(i))
  }

  for (const i of encodeError) {
    expect(() => encodeURIComponent(i)).toThrow()
    expect(() => encode(i)).toThrow()
  }
})

test("decode and encode", () => {
  for (const i of encodeData) {
    expect(decode(encodeURIComponent(i))).toEqual(i)
  }

  for (const i of decodeData) {
    expect(encodeURIComponent(decode(i))).toEqual(i)
  }
})

test("decode", () => {
  for (const i of decodeData) {
    expect(decode(i)).toEqual(decodeURIComponent(i))
  }

  for (const i of decodeError) {
    expect(() => decodeURIComponent(i)).toThrow()
    expect(() => decode(i)).toThrow()
  }
})
