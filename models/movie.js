var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var movie = new Schema({
    movie_title:            { type: String, required: true },
    movie_original_title:   { type: String, required: true },
    movie_runtime:          { type: String, required: true },
    movie_plot:             { type: String, required: true },
    movie_year:             { type: Number, required: true },
    movie_release_date:     { type: String, required: true },
    movie_country:          { type: String, required: true },
    movie_rating_fa:        { type: String, required: true },
    movie_rating_imdb:      { type: String, required: true },
    movie_rating_score:     { type: String, required: true },
    movie_rating_score_tag: { type: String, required: false },
    movie_rating_average:   { type: String, required: true },
    movie_official_web:     { type: String, required: false, match: /^(http|https):\/\/[^ "]+$/ },
    movie_poster_link:      { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ },
    movie_analyzed_date:    { type: Date,   required: true },
    movie_text_analyzed:    { type: String, required: false },
    movie_tweets_analyzed:  []
});

/*
tweet = {
    id              : status.id_str,
    avatar          : status.user.profile_image_url_https,
    username        : Sanitizer.sanitize(status.user.name),
    nick            : Sanitizer.sanitize(status.user.screen_name),
    text            : Sanitizer.sanitize(status.text),
    text_normalized : normalizeTweet.normalizeTweet(Sanitizer.sanitize(status.text)),
    text_ntml       : normalizeTweet.parseTweetToHtml(Sanitizer.sanitize(status.text))
};
*/

module.exports = mongoose.model('Movie', movie);
