/* eslint-env mocha */
'use strict'

const assert = require('chai').assert

describe('Passing test', () => {
  it('should pass', () => {
    assert(true)
  })
  it('should fail', () => {
    assert(false)
  })

  it('should wait', (done) => {
    setTimeout(() => {
      assert(true)
      done()
    }, 1500)
  })
})
