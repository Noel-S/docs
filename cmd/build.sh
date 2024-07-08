# get the argument
arg=$1

# set working directory
cd "$(dirname "$0")"

# check if the argument is valid
if [ "$arg" == "all" ] || [ "$arg" == "base" ] || [ "$arg" == "editor" ]; then
  echo "Building $arg"
else
  echo "Invalid argument, defaulting to all"
  arg="all"
fi

if [ "$arg" == "all" ]; then
  cd ../base
  npm run astro build > /dev/null
  echo "Base built"
  cd ../editor
  npm run build > /dev/null
  echo "Editor built"
  mkdir -p ../dist/edit/
  cp -r dist/* ../dist/edit/
elif [ "$arg" == "base" ]; then
  cd ../base
  npm run astro build > /dev/null
  echo "Base built"
elif [ "$arg" == "editor" ]; then
  cd ../editor
  npm run build > /dev/null
  mkdir -p ../dist/edit/
  cp -r dist/* ../dist/edit/
  echo "Editor built"
fi