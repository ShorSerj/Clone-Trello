const img = require('../src/backImage.js')
const expect = require('chai').expect
const assert = require('chai').assert

const listBack = ["url(../img/back_1.jpg", "url(../img/back_2.jpg", "url(../img/back_3.jpg", "url(../img/back_4.jpg"]

suite('test-back', function () {
    test('getAdvice() должна возвращать совет', function () {
        assert(img.BackImage.changeBack(listBack))
    })
})