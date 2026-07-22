# Family Tree site (family.dbaomarhuertasllc.com)

Static single-page site, deployed via GitHub Pages. Source of truth for content
is `~/FamilyTree/site/family_tree.html` — after editing that, regenerate this
`index.html` (wraps it with the password gate) and push.

Password gate is a client-side SHA-256 check — low security, appropriate for a
low-stakes private family page, not a real access control. Don't put anything
here you wouldn't want a determined person to eventually see.
