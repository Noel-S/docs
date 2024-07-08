# execute build.sh with the argument base
./cmd/build.sh base

git add . > /dev/null
git commit -m "publishing docs base" > /dev/null
git push origin main > /dev/null
echo "New files in docs where published"