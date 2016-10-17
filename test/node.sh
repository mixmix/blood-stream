#!/bin/sh

if [ "$#" -gt 0 ]
then
  getPaths="echo $@"
else
  getPaths="find . -iname '*.test.js' -not -path './node_modules/*'"
fi

eval "$getPaths" | xargs tape | tap-diff
