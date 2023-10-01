// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Deserialize;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_setup_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


#[tauri::command]
fn get_setup_state()-> bool{
    let state: bool = false;
    return state
}

// #[tauri::command]
// fn get_mojang_versions(){
//     let response = reqwest::blocking::get("https://piston-meta.mojang.com/mc/game/version_manifest.json").unwrap();
//     let json = response.json();
//     let var = json.unwrap();
//     var
// }

// #[derive(Debug, Deserialize)]
// struct mojangVersions {
//     city: String,
//     name: String,
// }