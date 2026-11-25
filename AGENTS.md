# Git workflow

After completing and verifying changes requested by the user in this repository, commit the changes made for that task and push the current branch to its configured upstream. Leave unrelated changes out of the commit. Skip the commit and push when the task produced no changes or the user asks to skip them. Report the commit and push result in the final response.

# Slide typography

Use these fonts across all slide decks:

- Slide titles, subheadings, and body text use Latin Modern Sans. Use the Bold face for titles and subheadings.
- Mathematical formulas outside pseudocode use Latin Modern Math.
- Pseudocode uses Georgia for text and KaTeX Main and KaTeX Math for formulas.

Load `presentation-typography.css` for slide decks. Mark pseudocode containers with `.pseudocode` and use `data-tex` for formulas. Enable MathML output with `data-math-output="mathml"` on the deck body so that `math.js` uses Latin Modern Math outside pseudocode and KaTeX HTML inside it.
