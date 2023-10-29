
import { Component, createEffect, createSignal, onMount } from "solid-js";
import createPropsState from '../../utils.ts'
import mailImg from "../../assets/Launcher/Mail.png"
import notifImg from "../../assets/Launcher/notif.png"

import closeImg from "../../assets/Launcher/close.png"

import effectue_banner2Img from "../../assets/Launcher/effectue_banner2.svg"
import skinImg from "../../assets/Launcher/skin.png"
import chocomenuImg from "../../assets/Launcher/choco-menu.png"
import effectue_faviconImg from "../../assets/Launcher/effectue_favicon.svg"
import plusImg from "../../assets/Launcher/plus.png"

import controllerImg from "../../assets/Launcher/sidebar/controller.png"
import puzzleImg from "../../assets/Launcher/sidebar/puzzle.png"
import { Popover } from "solid-bootstrap";

interface HomeProps {
  version: string,
  launchDetails: unknown
}

const Home: Component<HomeProps> = (props: HomeProps) => {
  const [clientName, setClient] = createSignal({name: 'Effectue', themeColor: '#771AD0'})
  const [launchDet, setLaunchDet] = createPropsState(props.launchDetails)


  createEffect(()=>{
    document.querySelector(':root')!.style.setProperty('--homeLaunchButtonColor', clientName().themeColor);
    document.querySelector(':root')!.style.setProperty('--launchmodSelector', clientName().themeColor);
    
  })
  onMount(()=>{

    document.getElementById('UseClientMods')!.checked = launchDet().useEffectueMods
    if (launchDet().allowEffectueMods == true){
      document.getElementById('UseClientMods')!.disabled = false
    }else if (launchDet().allowEffectueMods == false){
      document.getElementById('UseClientMods')!.disabled = true
    }
    
    // console.log(launchDet().useEffectueMods)
    document.getElementById('UseExistingMods')!.checked = launchDet().useExistingMods
    if (launchDet().allowExistingMods == true){
      document.getElementById('UseExistingMods')!.disabled = false
    }else if (launchDet().allowExistingMods == false){
      document.getElementById('UseExistingMods')!.disabled = true
    }
    // console.log(launchDet().useExistingMods)
  })


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkboxClientChange = (event: unknown) => {
    const launchDetTemp = launchDet()
    launchDetTemp.useEffectueMods = event.currentTarget.checked;
    setLaunchDet(launchDetTemp)
    // console.log(launchDet().useEffectueMods)  
  };
  const checkboxExistingChange = (event: unknown) => {
    const launchDetTemp = launchDet()
    launchDetTemp.useExistingMods = event.currentTarget.checked;
    setLaunchDet(launchDetTemp)
    // console.log(launchDet().useExistingMods)
  };

  return (
    <>
    <div class="launcher" style="animation: opacityFade 0.5s forwards;height: 94vh;">
          <div class="play">
            <div class="banner banner2" style="display: flex; height: 93.9vh ;   width: 89.7vw; justify-content: center; align-items: end;">
              <div style="margin-bottom: auto;    display: flex;
    /* gap: 2rem; */
    /* flex-direction: row; */
    justify-content: center;">
                <div class="navbar">
                  <div class="quickplay" style="width: 49vw;
    overflow: hidden;
    height: 7.6vh;">
                    <div>
                      <img src={chocomenuImg} alt="" width="20" height="20" class="clientMenu"/>
                      <h1>CLIENTS</h1>
                      <h1 style="padding-left: 1rem;padding-right: 1rem;font-size: 15px;">|</h1>
                      <div class="server-icon-list">

                        <div class="navbarDiv"><img src={effectue_faviconImg} alt=""/></div>
                        <div class="navbarDiv"><img src={plusImg} alt=""/></div>
                        <div class="navbarDiv"><img src={plusImg} alt=""/></div>
                        <div class="navbarDiv"><img src={plusImg} alt=""/></div>
                        <div class="navbarDiv"><img src={plusImg} alt=""/></div>
                        <div class="navbarDiv"><img src={plusImg} alt=""/></div>
                        <div class="navbarDiv"><img src={plusImg} alt=""/></div>

                      </div>
                    </div>

                  </div>
                  <div class="quickplay" style="
      padding: 0.3rem;padding-right: 0.5rem; cursor: pointer;width: 26vw;overflow:hidden;" id="ccc">
                    <div>

                      <h1>VERSIONS</h1>
                      <h1 style="padding-left: 1rem;padding-right: 1rem;font-size: 15px;">|</h1>
                      <div class="server-icon-list">

                        <div class="navbarDiv"><img src={puzzleImg} alt=""/></div>
                        <div class="navbarDiv"><img src={puzzleImg} alt=""/></div>
                        <div class="navbarDiv"><img src={puzzleImg} alt=""/></div>

                      </div>


                    </div>
                  </div>

                  <div class="navbtn">
                    <img src={notifImg} alt="" style="  width: 30px;
    height: 30px;"/>

                  </div>
                  

                  


                </div>

                <img class="clientName" src={effectue_banner2Img} alt=""
                  style="width: var(--bannerIconHeight);height: var(--bannerIconHeight); transition: 0.2s;"/>

              </div>

              <div id='launch' style={`overflow: hidden;border-color: ${clientName().themeColor}9e`}>
                {/* <div><h1 id='launch-text'>Launch {clientName().name}</h1></div> */}
                
                {/* <div style="display: flex; align-items:center; justify-content: center;">
                  <img src={controllerImg} style="top: -1px;width: 10px;height: 10px;" alt=""/>
                  <h6 style="color: white; padding-left:2px; font-family:'Courier New', Courier, monospace;">Ready to
                    launch </h6>
                </div> */}




                {/* other stuff in the play area */}
                <div style="display:flex;gap:7.1vw">
                <div class="checkbox-wrapper-14" style="display: flex; align-items: center; width:170px; padding:0.3rem">
                  <input onChange={checkboxClientChange} id="UseClientMods" type="checkbox" class="switch"/>
                  <label  for="UseClientMods">Use {clientName().name} Mods</label>
                </div>
                <div class="checkbox-wrapper-14" style="display: flex; align-items: center; width:170px; padding:0.3rem">
                  <input onChange={checkboxExistingChange} id="UseExistingMods" type="checkbox" class="switch"/>
                  <label for="UseExistingMods">Use Existing Mods</label>
                </div>
                </div>
                {/* PLAY button Credit: https://codepen.io/hilwat/pen/BeemVX */}
                <div class="buttons">
  <button class="blob-btn">
    Launch {clientName().name} {props.version}
    <span class="blob-btn__inner">
      <span class="blob-btn__blobs">
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
      </span>
    </span>
  </button>
  <br/>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
      <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
    </filter>
  </defs>
</svg>

              </div>




            </div>
          </div>
          {/* <div style="color: white;display: flex;">
            <div style="width: var(--launcherWidth);">
              <div style="
    display: flex;
align-items: center;">
                <h1 style="
    float: left; font-size: 25px; padding-top: 10px;
">LATEST NEWS</h1>
                <h6 style="
    /* float: right;
    margin-left: auto;
">View all News</h6>
              </div>
              {/* <div id="news-container" class="news-container" onscroll={scrollListener}>

                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>
                <div class="news-item"></div>

              </div>}
            </div>

          </div> */}
        </div>
        </div>
        </>
  );
};

export default Home;