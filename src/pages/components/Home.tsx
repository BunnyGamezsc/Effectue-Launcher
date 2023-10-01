
import { Component } from "solid-js";

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



const Home: Component = () => {
  function scrollListener(e:any) {
    const root:HTMLElement = document.querySelector(':root')!
      const scroll = e.currentTarget.scrollTop
      if (scroll >= 4) {
        console.log("show news")
        root.style.setProperty('--bannerHeight', '280px')
        root.style.setProperty('--newsHeight', '400px')
        root.style.setProperty('--friendHeight', '350px')
        root.style.setProperty('--bannerIconHeight', '90px')
        root.style.setProperty('--loginTop', '-35rem')
  
  
  
      } else if (scroll < 4 && scroll >= 0) {
        console.log("hide news")
        root.style.setProperty('--bannerHeight', '500px')
        root.style.setProperty('--newsHeight', '170px')
        root.style.setProperty('--friendHeight', '230px')
        root.style.setProperty('--bannerIconHeight', '200px')
        root.style.setProperty('--loginTop', '-40rem')
  
      }
  }




  return (
    <>
    <div class="launcher" style="animation: opacityFade 0.5s forwards;">
          <div class="play">
            <div class="banner banner2" style="display: flex;     width: 89.7vw; justify-content: center; align-items: end;">
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
                  {/* <div class="closebtn">
                    <img src={closeImg} alt="" style="  width: 30px;
    height: 30px;"/>

                  </div> */}
                  <script defer src="script.js"></script>

                  


                </div>

                <img class="clientName" src={effectue_banner2Img} alt=""
                  style="width: var(--bannerIconHeight);height: var(--bannerIconHeight); transition: 0.2s;"/>


              </div>


              <div id='launch'>
                <h1 id='launch-text'>Launch</h1>
                <div style="display: flex; align-items:center; justify-content: center;">
                  <img src={controllerImg} style="top: -1px;width: 10px;height: 10px;" alt=""/>
                  <h6 style="color: white; padding-left:2px; font-family:'Courier New', Courier, monospace;">Ready to
                    launch </h6>
                </div>

              </div>

            </div>
          </div>
          <div style="color: white;display: flex;">
            <div style="width: var(--launcherWidth);">
              <div style="
    display: flex;
align-items: center;">
                <h1 style="
    float: left; font-size: 25px; padding-top: 10px;
">LATEST NEWS</h1>
                <h6 style="
    /* float: right; */
    margin-left: auto;
">View all News</h6>
              </div>
              <div id="news-container" class="news-container" onscroll={scrollListener}>

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

              </div>
            </div>

          </div>
        </div>
        </>
  );
};

export default Home;