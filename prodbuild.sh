#!/usr/bin/env bash
./build.sh
uglifyjs -cm -o pacman.min.js pacman.js