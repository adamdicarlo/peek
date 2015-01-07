#!/usr/bin/env node
var amdWrap = require('amd-wrap')
var fs = require('fs')

fs.writeFileSync('index.amd.js', amdWrap(fs.readFileSync('index.js')))
