# @cookshack/codemirror-bracket-matching

[CodeMirror](https://codemirror.net/) 6 extension for highlighting matching brackets.

Based on the [builtin CodeMirror bracket matching](https://codemirror.net/docs/ref/#language.bracketMatching), with
one additional option for the `config` option of `bracketMatching`:

| Option      |                                                                           |
|-------------|---------------------------------------------------------------------------|
| directional | Whether the matching picks which bracket to match based on whether the    |
|             | bracket is before or after the cursor. Opening brackets only match when   |
|             | they are after. Closing bracket only match when they are before.          |
|             | Overrides `afterCursor`.                                                  |
|             | Defaults to true.                                                         |
|-------------|---------------------------------------------------------------------------|

Setting `directional` to `true` make the bracket matching behave more like Emacs
and Codium.
