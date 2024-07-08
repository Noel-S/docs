# execute build.sh with the argument base
cd "$(dirname "$0")"
./build.sh base

# move to parent directory
cd ..
git add base/ > /dev/null
git commit -m "publishing docs base" > /dev/null
git push origin main > /dev/null
echo "New files in docs where published"