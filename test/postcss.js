'use strict'

let assert  = require('chai').assert
let postcss = require('./../src/postcss')

describe('postcss()', function() {

	it('should return an error when called with incorrect CSS', function(done) {

		let input = `test`

		postcss(null, input, null, (err, result) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should return an empty string when called without parameters', function(done) {

		postcss(null, null, null, (err, result) => {

			assert.isNull(err)
			assert.strictEqual(result, '')

			done()

		})

	})

	it('should return CSS with a source map when called with valid CSS', function(done) {

		let input = `.test { color: black; }`

		postcss(null, input, null, (err, result) => {

			assert.isNull(err)
			assert.isString(result)
			assert.include(result, 'sourceMappingURL')

			done()

		})

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', function(done) {

		let input = `.test { color: black; }`
		let opts  = { optimize: true }

		postcss(null, input, opts, (err, result) => {

			assert.isNull(err)
			assert.isString(result)
			assert.notInclude(result, 'sourceMappingURL')

			done()

		})

	})

})