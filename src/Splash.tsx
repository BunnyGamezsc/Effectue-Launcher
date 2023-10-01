import logo from './assets/logo_black.png'
import splashback from './assets/splashBackground.jpg'
import './App.css'
import { createSignal } from 'solid-js';

const Splash = () => {
  const [fadeOut, setFadeOut] = createSignal("1s ease 0s 1 normal none running fadeIn");
  const [fadeOut2, setFadeOut2] = createSignal("");

    const splashAnimation = {
    "animation": fadeOut()
  }
  const splashBackAnimation = {
    "animation": fadeOut2()
  }
  const toRef = setTimeout(() => {
    setFadeOut("1s ease 0s 1 normal forwards running fadeOut");
    setFadeOut2("0.45s ease 0s 1 normal forwards running fadeOutBack ")
    // it is good practice to clear the timeout (but I am not sure why)
  }, 2200);

    return (<>
      <div id="splash">
      <div id="splashBackground" style={{"animation": fadeOut()}} class="splashBackground"></div>
      <img src={logo} style={{"animation": fadeOut2()}} id="splashLogo" class="icon" alt="logo_black"/>
      </div>
    </>);
      

      
    // function buildSplash(event): void {
    //     let el = event.target;
    //     const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
    //     el.addEventListener("load", async () => {
    //         console.log("Loaded");
    //         let bodyHTML = document.getElementById("app");
      
      
    //         document.getElementById("root").innerHTML = `<div id="splash">
    //         <div id="splashBackground" class="splashBackground"></div>
    //         <img src="assets/logo_black.png" id="splashLogo" class="icon" alt="logo_black">
    //       </div>`;
    //       await delay(800);
    //       (document.getElementsByTagName("img")[0] as HTMLImageElement).style.transition = "2s";
    //         for (let i = 0; i < 2; i++) {
    //             (document.getElementsByTagName("img")[0] as HTMLImageElement).style.transition = "2s";
    //             (document.getElementsByTagName("img")[0] as HTMLImageElement).style.width = "50%";
    //             await delay(500);
    //             (document.getElementsByTagName("img")[0] as HTMLImageElement).style.transition = "2s";
    //             (document.getElementsByTagName("img")[0] as HTMLImageElement).style.width = "60%";
    //             await delay(500);
    //         }
    //         document.getElementById("root").appendChild(bodyHTML);
    //         (document.getElementById("splashLogo") as HTMLElement).style.animation = "fadeOut 1s";
    //         (document.getElementById("splashBackground") as HTMLElement).style.animation = "fadeOutBack 0.45s";
    //         await delay(350);
    //         (document.getElementById("splashBackground") as HTMLElement).remove();
    //         await delay(550);
    //         document.getElementById("root").innerHTML = bodyHTML.innerHTML;
          
    //     });
      // }
  };

export default Splash