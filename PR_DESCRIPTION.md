Title: chore(ui): polish hero & navbar, theme-aware surfaces and accessibility improvements

Summary:

Files changed (high level):

Verification:

Notes:

Additional artifacts included in the branch (if committed):
- `client/screenshots/*-light.png`, `client/screenshots/*-dark.png`
- `client/a11y/axe-report.json`, `client/a11y/summary.json`
- `client/scripts/screenshot.js`, `client/scripts/axe-audit.js`

Commands to create and push the review branch locally:

```powershell
cd "c:\Users\Tanmay\OneDrive\BTech-AIML\senvia-niryat-ai\senvia-niryat-ai"
# create branch
git checkout -b chore/add-ui-screenshots-a11y
# add files
git add client/screenshots client/a11y client/scripts package.json PR_DESCRIPTION.md
# commit
git commit -m "chore: add UI screenshots and accessibility report; add audit and screenshot scripts"
# push
git push -u origin chore/add-ui-screenshots-a11y
```

If you prefer, I can try to run these git commands here; previously the terminal showed intermittent interruptions so running locally may be more reliable.
