'use strict'

const Base = require('mocha').reporters.Base
const color = Base.color
const cursor = Base.cursor

module.exports = function EmojifiedReporter (runner, options) {
  Base.call(this, runner)
  let passes = 0
  let failures = 0
  let indents = 0

  const indent = () => {
    return Array(indents).join('   ')
  }

  runner.on('start', () => {
    cursor.hide()
  })

  runner.on('suite', (suite) => {
    ++indents
    console.log(`${indent()}${suite.title}\n`)
  })

  runner.on('suite end', () => {
    --indents
    if (indents === 1) {
      console.log()
    }
  })

  runner.on('pass', (test) => {
    passes++
    console.log(`${indent()}😀 ${color('pass', test.title)} ${test.speed === 'fast' ? '' : `(🕐 ${test.duration})`}`)
  })

  runner.on('pending', () => {
    console.log(`${indent()}🤔 ${color('pending', test.title)}`)
  })

  runner.on('fail', (test, err) => {
    console.log(`${indent()}😥 ${color('fail', test.title)}`)
    failures++
  })

  runner.on('end', () => {
    cursor.show()
    console.log(`😍 ${passes}/${passes + failures}`)
    this.epilogue()
    process.exit(failures)
  })
}
