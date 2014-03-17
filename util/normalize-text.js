var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüû";
var to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuu";

var letterNumber = /^[0-9a-zA-ZñÑ]+$/;  
var mapping      = {};

for(var i = 0, j = from.length; i < j; i++ ) {
    mapping[ from.charAt( i ) ] = to.charAt( i );
}

var normalizeTitle = function( text ) {

    var array = [];
    var text = text.toLowerCase();

    for( var i = 0, j = text.length; i < j; i++ ) {

        var c = text.charAt( i );

        if( mapping.hasOwnProperty( text.charAt( i ) ) ) {

            array.push( mapping[ c ] );

        } else {

            if ( c === ' ' ) {
                
                array.push( '-' );
                
            } else if ( c.match(letterNumber) ) {
                    
                array.push( c );
            }
        }
    }

    var titleNormalized = array.join( '' );

    return titleNormalized;
};

var testNormalizeTitle = function() {

    var title    = "300:/- Hola, ¿estáis todos los niños?";
    var expected = "300-hola-estais-todos-los-niños"
    
    var result = normalizeTitle(title);

    if ( result !== expected ) {
        console.log('------------------------------');
        console.log('expected =', expected);
        console.log('result   =', result);
        console.log('------------------------------');
    } else {
        console.log('ok');
    }
};

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
exports.normalizeTitle = normalizeTitle;

//testNormalizeText();
//testNormalizeTitle();