async function start () {
    return await Promise.resolve('async function is working')
}

start().then(console.log)

class Util {
    static id = Date.now
}

// const SimpleWorld = 42

console.log('Util id: ', Util.id)

import ('lodash').then( _ => {
    console.log('lodash', _.random(0, 100, true))
})