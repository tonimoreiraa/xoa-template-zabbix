#!/usr/bin/node
const module = './' + process.argv[2] + '.js'
await import(module)