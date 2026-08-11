## Introduction to Expo

### What is Expo?
Expo is an open-source framework for building universal, cross-platform applications targeting Android, iOS, and Web using React and TypeScript/JavaScript. It provides:

1. Developer Tooling & SDK: Standardized cross-platform APIs (camera, storage, haptics, notifications) and file-based routing (Expo Router).

2. Cloud Infrastructure (EAS): Optional continuous integration, cloud compiling, binary submission, and instant Over-The-Air (OTA) updates.

* The Expo developer tools are free (open source). They can be used directly without an account at Expo.
* To use the cloud infrastructure (EAS: Expo Application Services), a freemium model is applied. An account at expo.dev is mandatory. There exists a free tier (like 15 free builds per month for iOS and android), after which it will be charged for further builds.
* Is EAS mandatory for production? No, you can build signed release builds (APKs or IPAs) if you have the local tools (Android SDK and XCode). However, EAS provides useful infrastructure like managed signing credentials, cloud builds without own hardware (e.g. Mac), easier Play / App Store submission pipelines, EAS Update hosting (over-the-air JS/asset updated), among others. EAS allows to automate the store-submission process.

### Expo Basic Architecture

Top-Down:
1. JavaScript / React Layer
   - App Components, Expo Router, Business Logic, State

2. Expo SDK JavaScript APIs
   - expo-camera, expo-secure-store, expo-location, etc.
   - The SDK wraps complex native phone hardware into unified JavaScript APIs

Between 2->3: JSI / C++ Direct Calls

3. Expo Modules API (Native Bridge)
   - Swift DSL on iOS  <--->  Kotlin DSL on Android
   - This layer bypasses legacy asynchronous JSON bridges, using React Native's JSI (JavaScript Interface) to allow JavaScript to invoke C++ and native OS functions directly with near-zero latency.

4. Host Platform OS Engine
   - iOS (UIKit / Swift)
   - Android (Views / Kotlin)

### How to run / debug

#### Setup
* You can use the commands `npx` (comes with `npm`) or `yarn`
* To use EAS, install it with `npm install --global eas-cli`
* Create a project:
  - npx: `npx create-expo-app@latest .`
  - yarn: `yarn create expo-app .`

#### Run / Debug
* Run:
  - npx: `npx expo start`
  - yarn: `yarn expo start`
* The command displays options to run on the web (`w`), android (`a`) or iOS (`i`) and to scan a QR code to run the app in Expo Go on a mobile device. This is similar to the options displayed after `flutter run`
* Debugging: Options `j` to open the debugger and `r` to reload the app
* View logs in the web console (`F12`) or directly on the terminal when the app is running on a physical device or a simulator

#### Build with EAS
* Link the remote project: `eas init --id <project-id>`
* Build an android release: `eas build --platform android --profile production`
  - Similar commands for debug builds, iOS buids, etc.

### Expo Go vs development builds:
* Expo Go is a Sandbox Client for iOS and Android (downloadable on the App-/PlayStore). It can scan the QR code provided by `npx expo start` and quickly run the app, inside the sandbox, on the android or iOS device
  - Fast to setup and run (No XCode, Android Studio or Mac required)
  - Limited to pre-included standard Expo SDK APIs (not all native features are supported)
  - Used for prototyping, learning, general testing that does not include unsupported native features

* A development build is a custom binary compiled to run directly on the android or iOS device (Exact Swift/Kotlin Code)
  - Requires local native tooling (Xcode/Android Studio) or EAS Build in the cloud
  - Unlimited native code support
  - Used for testing native third-party SDKs (payment gateways, custom bluetooth drivers, etc.), modifying native code and for production testing

### Migrating from Flutter to Expo
| Flutter | Expo / React Native Equivalent | Notes and Trade-Offs |
| --- | --- | --- |
| GoRouter | Expo Router | `ShellRoute` translates directly to Expo Router's `_layout.tsx` |
| Hive | `AsyncStorage` *or* `react-native-mmkv` | `react-native-mmkv` is up to 30x faster but requires a dev build |
| Riverpod | TanStack Query | |
| ListView.builder | FlashList for long and/or complex lists. Built-in FlatList struggles with long/complex lists | |
