import ist from "ist";
import { matchBrackets, matchEnclosingBrackets } from "@cookshack/codemirror-bracket-matching";
import { EditorState } from "@codemirror/state";
describe("matchBrackets", () => {
    it("(a·b)", () => {
        let state = EditorState.create({ doc: "(a·b)" });
        ist(matchBrackets(state, 2, -1, { afterCursor: false,
            brackets: "()[]{}",
            directional: false,
            enclosing: false,
            maxScanDistance: 10 }), null);
    });
    it("(a·b) directnl", () => {
        let state = EditorState.create({ doc: "(a·b)" });
        ist(matchBrackets(state, 2, -1, { afterCursor: false,
            brackets: "()[]{}",
            directional: true,
            enclosing: false,
            maxScanDistance: 10 }), null);
    });
});
describe("matchEnclosingBrackets", () => {
    it("(a·b) encl", () => {
        let state = EditorState.create({ doc: "(a·b)" });
        let match = matchEnclosingBrackets(state, 2, -1, { afterCursor: false,
            brackets: "()[]{}",
            directional: false,
            enclosing: true,
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 4);
        ist(match.end.to, 5);
    });
});
