#!/bin/bash
npm run build
rm -rf ../docs
cp -r dist ../docs
touch ../docs/.nojekyll
git add -u ../docs
git add ../docs/*
python fix_paths.py
git commit -m'deploy'
git push