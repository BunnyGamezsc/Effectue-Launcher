import './App.css'
import Splash from './Splash';
import Setup from './pages/Setup';
import Launcher from './pages/Launcher';
import { Show, createSignal, onMount } from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { appDataDir } from '@tauri-apps/api/path';

function App() {
  const [setup, setSetupState] = createSignal(false);
  const [hideSplash, setSplashData] = createSignal(false);
  const [hideSplash2, setSplash] = createSignal(false);
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
onMount(async () => {
    invoke('get_setup_state').then((rs_setupState) => {
      setSetupState(rs_setupState as boolean);
      console.log(rs_setupState);
    }).catch((error) => console.error(error))
    const appDataDirPath = await appDataDir();
    console.log(appDataDirPath)
  })

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
      
      <Show when={hideSplash2() == false}>
        <Splash/>
      </Show>
      <Show when={hideSplash() == true}>
        {setup() ? <Setup/> : <Launcher/>}
      </Show>
      </div>
    </div>
  )
}







export default App