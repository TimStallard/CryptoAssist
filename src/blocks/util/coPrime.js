function getFactors(num){
  var factors = [];
  for(var i = 2; i <= num; i++){
    if(num%i == 0){
      factors.push(i);
    }
  }
  return factors;
}

function coPrime(a, b){
  var aFactors = getFactors(a);
  var bFactors = getFactors(b);
  var common = aFactors.filter((factor)=>(bFactors.indexOf(factor) > -1));

  return (common.length == 0);
}

module.exports = coPrime;
