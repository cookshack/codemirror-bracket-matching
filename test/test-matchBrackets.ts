import ist from "ist"
import {matchBrackets, matchEnclosingBrackets} from "@cookshack/codemirror-bracket-matching"
import {EditorState} from "@codemirror/state"
import {DecorationSet} from "@codemirror/view"
import {language as zig} from "@cookshack/codemirror-lang-zig";

function state(text, lang) {
  return EditorState.create({ doc: text, extensions: lang == "zig" ? [ zig() ] : [] })
}

describe("matchBrackets", () => {
  it("(·)", () => {
    ist(matchBrackets(state("()"), 1, 1),
        null)
  })

  it("(·) ←", () => {
    ist(matchBrackets(state("()"), 1, -1),
        null)
  })

  it("·()", () => {
    let match = matchBrackets(state("()"), 0, 1)
    ist(match.matched, true)
    ist(match.end.from, 1)
    ist(match.end.to, 2)
  })

  it("·() ←", () => {
    ist(matchBrackets(state("()"), 0, -1),
        null)
  })

  it("(a·b)", () => {
    ist(matchBrackets(state("(ab)"), 2, 1),
        null)
  })

  it("(a·b) ←", () => {
    ist(matchBrackets(state("(ab)"), 2, -1),
        null)
  })

  it("·(ab)", () => {
    let match = matchBrackets(state("(ab)"), 0, 1)
    ist(match.matched, true)
    ist(match.end.from, 3)
    ist(match.end.to, 4)
  })

  it("·(ab) ←", () => {
    ist(matchBrackets(state("(ab)"), 0, -1),
        null)
  })

  it("(ab)·", () => {
    let match = matchBrackets(state("(ab)"), 4, 1)
    ist(match.matched, false)
  })

  it("(ab)· ←", () => {
    let match = matchBrackets(state("(ab)"), 4, -1)
    ist(match.matched, true)
    ist(match.end.from, 0)
    ist(match.end.to, 1)
  })
})

describe("matchEnclosingBrackets", () => {
  it("(·)", () => {
    let match = matchEnclosingBrackets(state("()"), 1)
    ist(match.matched, true)
    ist(match.end.from, 1)
    ist(match.end.to, 2)
  })

  it("·()", () => {
    ist(matchEnclosingBrackets(state("()"), 0),
        null)
  })

  it("()·", () => {
    ist(matchEnclosingBrackets(state("()"), 2),
        null)
  })

  it("(a·b)", () => {
    let match = matchEnclosingBrackets(state("(ab)"), 2)
    ist(match.matched, true)
    ist(match.end.from, 3)
    ist(match.end.to, 4)
  })

  it("·(ab)", () => {
    ist(matchEnclosingBrackets(state("(ab)"), 0),
        null)
  })

  it("(ab)·", () => {
    ist(matchEnclosingBrackets(state("(ab)"), 4),
        null)
  })

  it("(·ab)", () => {
    let match = matchEnclosingBrackets(state("(ab)"), 1)
    ist(match.matched, true)
    ist(match.end.from, 3)
    ist(match.end.to, 4)
  })


  it("(ab·)", () => {
    let match = matchEnclosingBrackets(state("(ab)"), 3)
    ist(match.matched, true)
    ist(match.end.from, 3)
    ist(match.end.to, 4)
  })
})

describe("matchBrackets with syntax nodes", () => {
  it("((1 * 2) ·+ 9);", () => {
    ist(matchBrackets(state("((1 * 2) ·+ 9);", "zig"), 9, 1),
        null)
  })

  it("((1 * 2) ·+ 9); ←", () => {
    ist(matchBrackets(state("((1 * 2) ·+ 9);", "zig"), 9, -1),
        null)
  })
})

describe("matchEnclosingBrackets with syntax nodes", () => {
  it("((1 * 2) ·+ 9);", () => {
    let match = matchEnclosingBrackets(state("((1 * 2) ·+ 9);", "zig"), 9, 1);
    ist(match.matched, true)
    ist(match.end.from, "((1 * 2) ·+ 9".length)
    ist(match.end.to, "((1 * 2) ·+ 9)".length)
  })

  it("((1 * 2) ·+ 9); ←", () => {
    let match = matchEnclosingBrackets(state("((1 * 2) ·+ 9);", "zig"), 9, -1);
    ist(match.matched, true)
    ist(match.end.from, "((1 * 2) ·+ 9".length)
    ist(match.end.to, "((1 * 2) ·+ 9)".length)
  })
})
