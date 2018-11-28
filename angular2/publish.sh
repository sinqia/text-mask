echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

cd ./angular2

yarn build

generatedNpmVersion="$(npm version $version)"

yarn publish --access public

git tag "angular2-${generatedNpmVersion}"
