#! /bin/bash

function writeVersion() {
cat << VERSION

exports.version = "`date`"

VERSION
}

echo "*************************************"
echo "* PUSH CHANGES TO GITHUB AND HEROKU *"
echo "*************************************"

echo "TWITTER_ACOUNT=$TWITTER_ACOUNT"

git diff | grep +++

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    #read -p "Write the commit message: " MESSAGE
    #writeVersion > util/version.js && \
    #more util/version.js && \
    #git add . && \
    #git commit -m "$MESSAGE" && \
    #git push && \

    git push heroku master && \
    #heroku config:add NODE_ENV=production && \
    #heroku config:add TWITTER_CONSUMER_KEY=$TWITTER_CONSUMER_KEY && \
    #heroku config:add TWITTER_CONSUMER_SECRET=$TWITTER_CONSUMER_SECRET && \
    #heroku config:add TWITTER_ACCESS_TOKEN_KEY=$TWITTER_ACCESS_TOKEN_KEY && \
    #heroku config:add TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET && \
    #heroku config:add TWITTER_ACOUNT=$TWITTER_ACOUNT && \
    #heroku config:add HEROKU_APP_NAME=$HEROKU_APP_NAME && \
    #heroku config:add TEXTALYTICS_KEY=$TEXTALYTICS_KEY && \
    #heroku config:add MONGODB_URL=$MONGODB_URL && \
    #heroku logs && \
    #heroku apps:rename $HEROKU_APP_NAME && \
    
    heroku open

fi
