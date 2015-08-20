#! /bin/bash

git fetch -a
git checkout heroku
git merge master -m "automerge"
git push origin heroku
git checkout master
