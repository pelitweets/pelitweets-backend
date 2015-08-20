#! /bin/bash

git fetch -a
git checkout heroku
git merge master
git push origin heroku
git checkout master
