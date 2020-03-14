const advice = ['advice1', 'advice2', 'advice3']


exports.getAdvice = function(){
    return advice[Math.floor(Math.random() * advice.length)]
}