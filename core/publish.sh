echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

yarn core:build

yarn core:verify

cd ./core

generatedNpmVersion="$(npm version $version)"

yarn publish --access public

git tag "core-${generatedNpmVersion}"
