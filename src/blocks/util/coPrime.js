function getFactors(num){
  factors = [];
  for(var i = 2; i <= num; i++){
    if(num%i == 0){
      factors.push(i);
    }
  }
  return factors;
}

function coPrime(a, b){
  aFactors = getFactors(a);
  bFactors = getFactors(b);
  common = aFactors.filter((factor)=>(bFactors.indexOf(factor) > -1));

  return (common.length == 0);
}

module.exports = coPrime;
