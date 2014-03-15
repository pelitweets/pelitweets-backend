var normalizeTweet = function(tweetText) {

    tweetText = tweetText || '';

    // remove \n
    tweetText = tweetText.replace(/\n/,"");

    // remove urls
    tweetText = tweetText.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, "");

    // remove usernames
    tweetText = tweetText.replace(/[@]+[A-Za-z0-9-_]+/g, "");

    // remove hashtags
    tweetText = tweetText.replace(/[#]+[A-Za-z0-9-_]+/g, "");

    return tweetText;
};

var parseTweetToHtml = function(tweetText) {

    tweetText = tweetText || '';

    // replace urls
    tweetText = tweetText.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
  	  	return url.link(url);
    });

    // replace usernames
    tweetText = tweetText.replace(/[@]+[A-Za-z0-9-_]+/g, function(username) {
	    return username.link("http://twitter.com/"+username.replace("@",""));
    });

    // replace hashtags
    tweetText = tweetText.replace(/[#]+[A-Za-z0-9-_ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûñNçÇ]+/g, function(tag) {
    	return tag.link("http://twitter.com/search?q="+tag.replace("#",""));
	});

    return tweetText;
};

var checkResult = function(funtionName, callback, tweetText, expected) {

    var result = callback(tweetText);

    if ( result !== expected) {
        console.log('------------------------------');
        console.log('funtionName =', funtionName);
        console.log('tweetText   =', tweetText);
        console.log('expected    =', expected);
        console.log('result      =', result);
        console.log('------------------------------');
    } else {
        console.log('ok', funtionName);
    }
};

var testNormalizeTweet = function() {

    checkResult(
      "normalizeTweet",
      normalizeTweet,
      'a,(@b.c) (#d.e)\n(-) (http://kk.com) f',
      'a,(.c) (.e)(-) () f');
};

var testParseTweetToHtml = function() {

    checkResult(
      "parseTweetToHtml",
      parseTweetToHtml,
      'a,(@b.c) (#d.e)\n(-) (http://kk.com) f',
       'a,(<a href="http://twitter.com/b">@b</a>.c) (<a href="http://search.twitter.com/search?q=d">#d</a>.e)\n(-) (<a href="http://kk.com">http://kk.com</a>) f');
};

exports.normalizeTweet = normalizeTweet;
exports.parseTweetToHtml = parseTweetToHtml;

//testNormalizeTweet();
//testParseTweetToHtml();
