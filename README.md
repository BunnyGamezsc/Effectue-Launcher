# Effectue Launcher - Effective Performace
_**DEV Section:** This Branch has up to date (maybe bugged) work that is not a full release_

[![License](https://img.shields.io/badge/License-Apache_2.0-green?&style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/version-alpha%200.0.1-blue?&style=for-the-badge)](https://github.com/BunnyGamezsc/Effectue-Solid/releases)
<br>
[![SolidJS](https://img.shields.io/badge/Solid-2C4F7C.svg?style=for-the-badge&logo=Solid&logoColor=white)](https://www.solidjs.com/)
[![Tauri](https://img.shields.io/badge/Tauri-24C8D8.svg?style=for-the-badge&logo=Tauri&logoColor=white)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)

### Purpose
Effectue was created to provide a customizable and fast Minecraft Experience with easy to use mods/modpacks!

## From the Launcher...
#### What can you do with the launcher?
- Play any version of Minecraft (Beta 1.0.0)
- Automatic performance mods with Forge or Fabric (Beta 2.0.0) (Quilt in Beta 2.3.0)
- Use your own custom modpack of selected mods (Beta 2.1.0)
- Use any library of community modpacks (v2.0.0)
- Log on to servers with mods (that are shared to everyone or a secret) (v2.0.0)

## To the Client...
### For Server Creators...
- Restrict Singleplayer and Multiplayer Access to your server when installing the modpack

### For Users...
- A special signature for the Effectue Launcher 


## As you can see, Effectue provides much more customizablity all in the Launcher itself

## But Effectue is different than other launchers

| Effectue    | Lunar |
| ----------- | ----------- |
| **Customize Settings in Launcher**| **Customize Settings in Client**      |
| **Performance Mods**   | **Lunar Performance and Asthetic Mods**        |
| **Forge / Fabric (/ Quilt)**   | Forge (Optifine) / Fabric|
| **Customize Mods** | N/A |
 **Server with special mods** | N/A |
 |Main Technology: Mod Loaders|**Main Technology: Custom Lunar Client**|
  |**App Size: ~70MB**|App Size: ~400MB|


 



## Installation / Demo / Contribution

### Prerequisites
[Git](https://git-scm.com/downloads)
<br>
[NodeJS (npm)](https://nodejs.org/en/download)
<br>
[Rust & Cargo](https://www.rust-lang.org/tools/install)

### Download

Step 1: Option 1
```bash
  git clone https://github.com/BunnyGamezsc/Effectue-Solid.git
  cd Effectue-Solid

  # Install Dependencies
  npm install --include=dev
```
Step 1: Option 2
```
  Download Zip (Code > Download Zip)
```

```bash
  cd /path/to/download/folder/Effectue-Solid

  # Install Dependencies
  npm install --include=dev
```

Step 2.5 (optional): Open with VSCode
```bash
  code .
```

### Run
Run with npm (development mode)
```bash
  npm run app
```
### Build

#### For all platforms
```bash
  npm run make
```
#### Mac

```bash
  # Auto detects your specific chipset (M1 or Intel)
  npm run make
  # Universal application
  npm run makeuniversal
  # Intel Chip application
  npm run makeintel
  # Apple Silicon application
  npm run makearm
```

## Tech Stack

**Frontend:** SolidJS, Tauri

**Backend:** Rust, SQLite
