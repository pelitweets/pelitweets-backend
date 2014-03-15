#! /bin/bash

function writeVersion() {
cat << VERSION

exports.version = "`date`"

VERSION
}

echo "**************************"
echo "* PUSH CHANGES TO GITHUB *"
echo "**************************"

git diff | grep +++

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    read -p "Write the commit message: " MESSAGE

    git add . && \
    writeVersion > util/version.js && \
    more util/version.js && \
    git commit -m "$MESSAGE" && \
    git push

fi
