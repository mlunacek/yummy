#!/bin/bash
rm -rf ../docs
cp -r dist ../docs
git add -u ../docs
git add ../docs/*
git commit -m'deploy'
git push