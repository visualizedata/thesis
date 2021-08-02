cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:visualizedata/thesis.git master:gh-pages
rm -rf .git
cd -
