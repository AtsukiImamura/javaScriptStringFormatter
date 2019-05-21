import stringFormat from './stringFormat.js'
import assert from 'assert'

describe('string format', function () {
    describe('integer', function () {
        it('should create a string based on format [1]', function () {
            assert.equal(stringFormat('hoge%-8.4s@@%08d', 'xyzab', 1234), 'hoge    xyza@@00001234')
        })
        it('should create a string based on format [2]', function () {
            assert.equal(stringFormat('hoge%.4dpiyo', 12345678), 'hoge1234piyo')
        })
        it('should create a string based on format [3]', function () {
            assert.equal(stringFormat('hoge%-6.4dpiyo', 12345678), 'hoge  1234piyo')
        })
        it('should create a string based on format [4]', function () {
            assert.equal(stringFormat('hoge%09.6dpiyo', 12345678), 'hoge000123456piyo')
        })
    })
    describe('float', function () {
        it('should create a string based on format', function () {
            assert.equal(stringFormat('hoge%-8.4s@@%08d', 'xyzab', 1234), 'hoge    xyza@@00001234')
        })
    })
    describe('string', function () {
        it('should create a string based on format [1]', function () {
            assert.equal(stringFormat('hoge%-8.4s@@', 'xyzab'), 'hoge    xyza@@')
        })
        it('should create a string based on format [2]', function () {
            assert.equal(stringFormat('hoge%8.4s@@', 'xyzab'), 'hogexyza    @@')
        })
        it('should create a string based on format [3]', function () {
            assert.equal(stringFormat('hoge%.4s@@', 'xyzab'), 'hogexyza@@')
        })
        it('should create a string based on format [4]', function () {
            assert.equal(stringFormat('hoge%.6s@@', 'xyzab'), 'hogexyzab@@')
        })
        it('should create a string based on format [5]', function () {
            assert.equal(stringFormat('hoge%08.4s@@', 'xyzab'), 'hoge0000xyza@@')
        })
    })

    describe('Hexadecimal', function () {
        it('should create a string based on format', function () {
            assert.equal(stringFormat('hoge%-8.4s@@%08d', 'xyzab', 1234), 'hoge    xyza@@00001234')
        })
    })

    describe('Octal', function () {
        it('should create a string based on format', function () {
            assert.equal(stringFormat('hoge%-8.4s@@%08d', 'xyzab', 1234), 'hoge    xyza@@00001234')
        })
    })
})