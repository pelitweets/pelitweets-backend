var isNumber = function(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

var roundWithDecimals = function(number, decimals)
{
  if (arguments.length == 1)
    return Math.round(number);

  var multiplier = Math.pow(10, decimals);
  return Math.round(number * multiplier) / multiplier;
}

exports.isNumber          = isNumber;
exports.roundWithDecimals = roundWithDecimals;
