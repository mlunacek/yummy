#!/bin/bash
npm run build
rm -rf ../docs
cp -r dist ../docs
touch ../docs/.nojekyll
python fix_paths.py
git add -u ../docs
git add ../docs/*
git commit -m'deploy'
git push