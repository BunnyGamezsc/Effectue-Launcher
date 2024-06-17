import { invoke } from "@tauri-apps/api";
import {createRoot, createSignal } from "solid-js";

function createSettings() {
    const [settings, setSettings] = createSignal({});
    invoke("get_settings")
      .then((settingsFromFile) => {
        setSettings(settingsFromFile as object)
        console.log(settingsFromFile);
      })
      .catch((error) => console.error(error));
    return { settings };
  }
  
export default createRoot(createSettings);