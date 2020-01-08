#!/usr/bin/env bash
zip build/current.zip * -j -x "*build*" -x "readme.org" -x "screen.png"
