const advice = require('../libs/advice.js')
const expect = require('chai').expect
const assert = require('chai').assert

suite('test-advice', function () {
    test('getAdvice() должна возвращать совет', function () {
        assert(typeof advice.getAdvice() === 'string')
    })
    test('getAdvice() должна возвращать совет', function () {
        assert(false)
    })
})

