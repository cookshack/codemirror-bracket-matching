import ist from "ist";
import { matchBrackets, matchEnclosingBrackets } from "@cookshack/codemirror-bracket-matching";
import { EditorState } from "@codemirror/state";
describe("matchBrackets", () => {
    it("(a·b)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        ist(matchBrackets(state, 2, -1, { brackets: "()[]{}",
            maxScanDistance: 10 }), null);
    });
});
describe("matchEnclosingBrackets", () => {
    it("(a·b)", () => {
        let state = EditorState.create({ doc: "(ab)" });
        let match = matchEnclosingBrackets(state, 2, -1, { brackets: "()[]{}",
            maxScanDistance: 10 });
        ist(match.matched, true);
        ist(match.end.from, 3);
        ist(match.end.to, 4);
    });
});
