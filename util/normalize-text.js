var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüû";
var to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuu";
var mapping = {};

for(var i = 0, j = from.length; i < j; i++ ) {
    mapping[ from.charAt( i ) ] = to.charAt( i );
}

var normalizeText = function( text ) {

    var array = [];

    for( var i = 0, j = text.length; i < j; i++ ) {

        var c = text.charAt( i );

        if( mapping.hasOwnProperty( text.charAt( i ) ) ) {

            array.push( mapping[ c ] );

        } else {

            array.push( c );
        }
    }

    var textNormalized = array.join( '' );

    if (     textNormalized.charAt(0) === '@'
          || textNormalized.charAt(0) === '#' ) {

        textNormalized = textNormalized.substring(1, textNormalized.length);
    }

    return textNormalized;
};

var testNormalizeText = function() {

    var result = normalizeText(from);

    if ( result !== to) {
        console.log('------------------------------');
        console.log('expected =', from);
        console.log('result   =', result);
        console.log('------------------------------');
    } else {
        console.log('ok');
    }
};

exports.normalizeText = normalizeText;

//testNormalizeText();
