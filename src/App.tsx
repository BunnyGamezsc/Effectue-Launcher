/**
 * File Name: App.tsx
 * Author: BunnyGamez
 * Created Date: May 23rd 2024
 * 
 * Description:
 * This is the main app file!!
 * 
 * Copyright (c) 2024 BunnyGamez
 * 
 * This file is part of the Effectue project.
 */

import "./App.css";
import Splash from "./Splash";
import Setup from "./pages/Setup";
import Launcher from "./pages/Launcher";
import { Show, createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { appDataDir } from "@tauri-apps/api/path";
import Testing from "./pages/Testing";
import { createStore } from "solid-js/store";

function App() {




  const [appCache, setAppCache] = createStore([])
  /* 
  What should be stored in the App Cache and is it ** stored offline??

  - ** Minecraft Versions Data (Restored into appCache each time the app is reloaded)
  - ** Last 3 used MC versions (in the beginning is initialized as 1.20 (the version I started the project on), 1.15 (my first mc version), 
    and 1.16.1 (best for speedrunning!))



  */
  const [setup, setSetupState] = createSignal(false);
  const [hideSplash, setSplashData] = createSignal(false);
  const [hideSplash2, setSplash] = createSignal(false);
  // eslint-disable-next-line prefer-const
  let testing = 0;

  // useEffect(() => {
  //   if (sampleData.length === 0) {
  //     const toRef = setTimeout(() => {
  //       setShowComponent(true);
  //       clearTimeout(toRef);
  //       // it is good practice to clear the timeout (but I am not sure why)
  //     }, 500);
  //   }
  // }, [sampleData]);

  // useEffect(() => {
  //   if (showComponent) {
  //
  //   }
  // }, [showComponent]);


  /*
  Startup:
  -  Gets setup information for first time opening the launcher / not authenticated yet
  -  Starts the Splash Screen Animation 
  -  **DEV ONLY** If testing mode it changes the component to testing screen instead of Launcher Home Page
  

  */

  onMount(async () => {
    invoke("get_setup_state")
      .then((rs_setupState) => {
        setSetupState(rs_setupState as boolean);
        console.log(rs_setupState);
      })
      .catch((error) => console.error(error));
    const appDataDirPath = await appDataDir();
    console.log(appDataDirPath);
    if (testing) {
      return;
    }
  });

  const toRef = setTimeout(() => {
    setSplashData(true);
    clearTimeout(toRef);
  }, 2000);

  const toRef2 = setTimeout(() => {
    setSplash(true);
    clearTimeout(toRef2);
  }, 3000);

  return (
    <div>
      <div id="app">
        <Show when={testing == 0}>
          <Show when={!hideSplash2()}>
            <Splash />
          </Show>
          <Show when={hideSplash()}>{setup() ? <Setup /> : <Launcher />}</Show>
        </Show>

        <Show when={testing == 1}>
          <Testing></Testing>
        </Show>
      </div>
    </div>
  );
}

export default App;
