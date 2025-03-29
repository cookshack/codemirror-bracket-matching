# @cookshack/codemirror-bracket-matching

[CodeMirror](https://codemirror.net/) 6 extension for highlighting matching brackets.

Based on the [builtin CodeMirror bracket matching](https://codemirror.net/docs/ref/#language.bracketMatching), with
two additional options for the `config` argument of `bracketMatching`:

#### directional

If true then matching picks which bracket to match based on whether the bracket
is before or after the cursor.

This makes the bracket matching behave more like Emacs and Codium. Opening
brackets only match when they are after the cursor. Closing brackets only match
when they are before the cursor.

Overrides `afterCursor`.

Defaults to `true`.

#### enclosing

If true then the innermost pair of brackets are highlighted.

Overrides `afterCursor` and `directional`.

Defaults to `false`.
