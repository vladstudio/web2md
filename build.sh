#!/bin/bash

echo "Building web2md..."

# Install dependencies
bun install

# Build executable
bun build --compile ./src/index.ts --outfile web2md

# Make it executable
chmod +x web2md

echo "Build complete! You can now use ./web2md"
