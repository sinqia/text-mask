echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

yarn addons:build

yarn addons:verify

cd ./addons

generatedNpmVersion="$(npm version $version)"

yarn publish --access public

git tag "addons-${generatedNpmVersion}"
