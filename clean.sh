#!/bin/bash

echo "🧹 Cleaning React Native project..."

# Stop any running metro
pkill -f "react-native"

# Watchman
watchman watch-del-all

# Node modules
rm -rf node_modules
npm cache clean --force

# Android build folders
rm -rf android/.cxx
rm -rf android/app/.cxx
rm -rf android/app/build

# Metro cache
rm -rf /tmp/metro-*
rm -rf /tmp/haste-map-*

# Install again
npm install

# Android clean
cd android
./gradlew clean
cd ..

# Done
echo "✅ Project cleaned. Run 'npx react-native start --reset-cache' and 'npx react-native run-android' now!"
