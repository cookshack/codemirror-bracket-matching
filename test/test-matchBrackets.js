import ist from "ist";
import { matchBrackets, matchEnclosingBrackets } from "@cookshack/codemirror-bracket-matching";
import { EditorState } from "@codemirror/state";
describe("matchBrackets", () => {
    it("(a·b)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        ist(matchBrackets(state, 2, 1, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
    it("(a·b) ←", () => {
        let state = EditorState.create({ doc: "(ab)" });
        ist(matchBrackets(state, 2, -1, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
    it("·(ab)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        let match = matchBrackets(state, 0, 1, { brackets: "()[]{}",
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 3);
        ist(match.end.to, 4);
    });
    it("·(ab) ←", () => {
        let state = EditorState.create({ doc: "(ab)" });
        ist(matchBrackets(state, 0, -1, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
    it("(ab)·", () => {
        let state = EditorState.create({ doc: "(ab)·" });
        ist(matchBrackets(state, 4, 1, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
    it("(ab)· ←", () => {
        let state = EditorState.create({ doc: "(ab)" });
        let match = matchBrackets(state, 4, -1, { brackets: "()[]{}",
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 0);
        ist(match.end.to, 1);
    });
});
describe("matchEnclosingBrackets", () => {
    it("(a·b)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        let match = matchEnclosingBrackets(state, 2, { brackets: "()[]{}",
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 3);
        ist(match.end.to, 4);
    });
    it("·(ab)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        ist(matchEnclosingBrackets(state, 0, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
    it("(ab)·", () => {
        let state = EditorState.create({ doc: "(ab)" });
        ist(matchEnclosingBrackets(state, 4, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
    it("(·ab)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        let match = matchEnclosingBrackets(state, 1, { brackets: "()[]{}",
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 3);
        ist(match.end.to, 4);
    });
    it("(ab·)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        let match = matchEnclosingBrackets(state, 3, { brackets: "()[]{}",
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 3);
        ist(match.end.to, 4);
    });
});
