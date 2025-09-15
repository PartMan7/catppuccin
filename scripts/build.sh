#!/usr/bin/env sh

node --experimental-strip-types -e '
import Noir from "./src/index.ts";

console.log(JSON.stringify({ default: Noir }, null, 2));
' > src/index.json
