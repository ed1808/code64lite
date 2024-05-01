// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::prelude::*;

#[tauri::command]
fn encode(data: &str) -> String {
    let encoded_data = BASE64_STANDARD.encode(data.as_bytes());

    encoded_data
}

#[tauri::command]
fn decode(data: &str) -> String {
    let decoded_data = BASE64_STANDARD.decode(data).unwrap();

    let result = String::from_utf8(decoded_data).unwrap();

    result
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![encode, decode])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
