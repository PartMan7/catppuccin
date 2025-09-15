#!/usr/bin/env sh

rm -rf built/*

# Build catppuccin-noir.json
node --experimental-strip-types -e '
import Noir from "./src/index.ts";
console.log(JSON.stringify(Noir, null, 2));
' > built/catppuccin-noir.json

mkdir -p built/ghostty
# Build Ghostty theme config
GHOSTTY_MOCHA_CONF_REMOTE='https://raw.githubusercontent.com/catppuccin/ghostty/refs/heads/main/themes/catppuccin-mocha.conf'
export GHOSTTY_MOCHA_CONF="$(curl "$GHOSTTY_MOCHA_CONF_REMOTE")"
node --experimental-strip-types -e '
import { replaceInText } from "./src/transform.ts";
console.log(replaceInText(process.env.GHOSTTY_MOCHA_CONF));
' > built/ghostty/catppuccin-noir.conf
