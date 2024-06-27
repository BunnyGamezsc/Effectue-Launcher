# Effectue Launcher - Effective Performace
_**DEV Section:** This Branch has up to date (maybe bugged) work that is not a full release_

[![License](https://img.shields.io/badge/License-Apache_2.0-green?&style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/version-alpha%200.0.1-blue?&style=for-the-badge)](https://github.com/BunnyGamezsc/Effectue-Solid/releases)
<br>
[![SolidJS](https://img.shields.io/badge/Solid-2C4F7C.svg?style=for-the-badge&logo=Solid&logoColor=white)](https://www.solidjs.com/)
[![Tauri](https://img.shields.io/badge/Tauri-24C8D8.svg?style=for-the-badge&logo=Tauri&logoColor=white)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)

## Purpose
Effectue is being created to provide a customizable and fast Minecraft Experience with easy to use mods/modpacks!

(This project is in progress for the first release)

### The Problems
1. Each new Minecraft version requires a whole new mod loader version and new mods...
2. Custom Modded Servers cannot easily restrict which mods the client can have...
### The Solutions
1. Effectue streamlines this process and automatically downloads mods and launches minecraft!
2. Effectue's custom server modpacks can restrict this and only allow specific mods on a server!


### Features!!
- Play any version of Minecraft
- Automatic performance mods with Fabric (and maybe Quilt?)
- Use your own mods with Effectue
- Use any library of community modpacks (v2.0)
- Log on to servers with mods (that are shared to everyone or a secret) (v2.1)

#### For Server Creators...
- Restrict Singleplayer and Multiplayer Access to your server when installing the modpack



## But Effectue is different than other launchers
Effectue provides much more customizablity all in the Launcher itself

(Projected Specifications)

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

**Backend:** Rust
