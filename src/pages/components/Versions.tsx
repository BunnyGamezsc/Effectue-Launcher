import { invoke } from "@tauri-apps/api";
import { Component, For, createEffect, createSignal, onMount } from "solid-js";
import { renderToString } from "solid-js/web";
import isOnline from 'is-online';
import createPropsState from "../../utils/createPropsState";
import waitForElementId from "../../utils/waitforElement";

const Versions: Component = (props) => {
  // get the current minecraft version
  //     20
  // get the next version x3
  //     19,18,17
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  let newsElem: HTMLDivElement | undefined;
  const versionBannerFiles = ["1.20","1.19","1.18","1.17","1.16","1.15","1.14","1.13","1.12","1.11","1.9","1.6"]
  const [version, setVersion] = createSignal([20])
  const [allVersions, setAllVersions] = createSignal([
    {
        "id": "1.20",
        "type": "0",
        "url": "0",
        "time": "0",
        "releaseTime": "0"
    }
])
  const [mainBannerBackground, setMainBannerBackground] = createSignal("")
  const [selectedMainVersion, setselectedMainVersion] = createSignal({"id": "1.20", "type": "release", "url": "", "time": "", "releaseTime": ""})
  const [selectedVersion, setselectedVersion] = createPropsState(props.selectedVersion)
  const [launchingText, setLaunchingText] = createPropsState(props.launchingText)
  console.log(selectedVersion())
  
  const [mainversion, setmainVersion] = createSignal([
    {
        "id": "1.20",
        "type": "0",
        "url": "0",
        "time": "0",
        "releaseTime": "0"
    }
])
const [selectedVersions, setAllSelectedVersions] = createSignal([
  {
      "id": "1.20",
      "type": "0",
      "url": "0",
      "time": "0",
      "releaseTime": "0"
  }
]);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const selectMainVersion = (el: Element, value) => {
  el.addEventListener("click",()=>{

    setselectedMainVersion(value);
    // console.log(selectedVersion())
    for (const child of el.parentElement!.children){
      child.setAttribute("version-selected", "false")
    }
    el.setAttribute("version-selected", "true")
  })
}

const selectVersion = (el: Element, value) => {
  el.addEventListener("click",()=>{
    setselectedVersion(value);
    // console.log(selectedVersion())
    for (const child of el.parentElement!.children){
      child.className = "optionalVersion"
    }
    el.className = "optionalVersionSelected"
  })
}


// ## SELECTED VERSION ACTIONS --->
createEffect(()=>{
  console.log(selectedMainVersion().id);
  console.log("selected Version 👆")
  console.log(selectedVersions())
  
  //console.log(allVersions())

})

createEffect(()=>{
  setAllSelectedVersions(allVersions().filter(
    (versionBlock)=>{
      // console.log(versionBlock.id)
      // console.log(Number(versionBlock.id))
      if(versionBlock.id.startsWith(selectedMainVersion().id)){
        
        if (versionBlock.id == selectedMainVersion().id){
          return versionBlock.id
        }else if (versionBlock.id.startsWith(selectedMainVersion().id + ".")){
          return versionBlock.id
        }
        return false
      }else{
        return false
      }
    }
  ))
})

  onMount(()=>{
   console.log(selectedMainVersion()) 
    setmainVersion([])
    const temp_version = version()
    for (let index = 0; index < version()[0]; index!++){
      const ii = index + 1
      temp_version.push(version()[0] - ii)
    }
    temp_version.pop()
    let displayVersions = temp_version

    
    fetch('https://piston-meta.mojang.com/mc/game/version_manifest.json')
    .then(async response => {
        const json = response.json()
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? json : null;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = /*(data && data.message) ||*/ response.status;
            console.log(error)
            return Promise.reject(error);
        }
        return json
    })
    .then((data) =>{
        // const data = r.json();
        // console.log(data)
        // console.log("[Server] " + data)
        if (typeof data == "undefined"){
          console.log("error: " + "")
        return
        }
        const dataa = data
        
        const latest = dataa.latest.release
        const versions = dataa.versions.filter((versionBlock)=>{
          // console.log(versionBlock.id)
          // console.log(Number(versionBlock.id))
          if (versionBlock.id == "1.2.1"){
            const ver = versionBlock
            ver.id = "1.2"
            return ver.type
          }
          if(versionBlock.type === "release" || isNaN(Number(versionBlock.id)) == false || versionBlock.id == "1.2.1"){
            return versionBlock.type
          }else{
            return false
          }
        })
        setAllVersions(versions)
        const mainVersions = versions.filter((idBlock) =>{
          // console.log(idBlock.id)
          // console.log(Number(idBlock.id))
          if (isNaN(Number(idBlock.id))){
            return false
          }else{
            return idBlock.id
          }
        })
        
        // console.log(latest)
        
        // console.warn(versions)
        // console.log(mainVersions)
        // let g = mainVersions
        // g.push({"id": "0.1", "type": "release", "url": "", "time": "", "releaseTime": ""})
        // setmainVersion(g)
        // console.error(mainversion())
        setmainVersion(mainVersions)
        // console.log(mainversion())
        let firstVersion = mainVersions[0]
        setselectedMainVersion(firstVersion)

        // 
        //  CHANGE WHICH VERSIONS WHICH HAVE BANNERS
        //
        let unsetBannerFiles: string[] = []
        mainversion().forEach((version) => {
          unsetBannerFiles.push(version.id)
        })
        unsetBannerFiles = unsetBannerFiles.filter(val => !versionBannerFiles.includes(val));
        for(const versionNum of unsetBannerFiles){
          document.getElementById("versionbanner-" + versionNum)!.style.backgroundImage = `linear-gradient(rgb(103 103 103 / 40%), rgb(183 183 183 / 50%)),url(/versionBanner/mc${randomIntFromInterval(1,4)}.jpg)`
          
        }
        
      })
    .catch(async error => {
        console.error('There was an error!', error);
        if (error as string == "TypeError: Load failed"){
          console.log("Fetched Url failed")
          if (await isOnline()){
            newsElem!.outerHTML = '<div style="position: relative;top: -26rem;left: 2.3vw;padding-top: 90vh;" id="loadingDIV"><h1 style="font-size:2.3rem">Server Error: Minecraft Versions URL Doesn\'t Exist</h1></div>';
          }else{
            newsElem!.outerHTML = '<div style="position: relative;top: -26rem;left: 2.3vw;padding-top: 90vh;" id="loadingDIV"><h1 style="display:flex;align-items:center;justify-content:center;font-size:2.3rem"><img style="padding-right:1rem;width:60px;height:60px" src="/src/assets/wifi_off.svg">Check Internet Connection</h1></div>';
          }
          
          
        }
        
        
    });
    
  })
  async function checkSelectedVersion(){
    let bannerExists = false;
    for (const bannerNum of versionBannerFiles){
        if (bannerNum == selectedMainVersion().id){
          bannerExists = true;
        }
    }
    console.log("versionbanner-" + selectedMainVersion().id)
      let selectedVersionBannerElem = document.getElementById("versionbanner-" + selectedMainVersion().id)?.style.backgroundImage
      console.log(selectedVersionBannerElem)
      
      return selectedVersionBannerElem
      // waitForElementId("versionbanner-" + selectedVersion().id).then((elm) =>{
      //   console.log(elm.style.backgroundImage)
      //   console.log("versionbanner-" + selectedVersion().id)
      //   // return elm.style.backgroundImage
      // })
    if (bannerExists){
      return selectedMainVersion().id
    }else{
      console.log("No banner found")
      
      return selectedMainVersion().id
    }
    
 } 
  function returnRows(arg0: { id: string; type: string; url: string; time: string; releaseTime: string; }[]): import("csstype").Property.GridTemplateRows<0 | (string & {}) > | undefined {
    let rowsarr = []
    for (let i = 0; i < Math.round((arg0.length/3 + 0.49999999)); i++) {
      rowsarr.push("var(--newsRow)")
    }
    // console.log(rowsarr.length)
    return rowsarr.join(" ")
  }

  return (
  <div class="launcher" style="animation: opacityFade 0.5s forwards;">
    <div class="play" style="height: 33.6vh;background-color:transparent;">
        <div class="banner versgrad" style="display:flex;width:89.7vw;justify-content:center;align-items:center;">
            <div style="margin-bottom:auto;margin-top: 0.5vh;display:flex;/* gap:2rem; */ flex-direction:row;justify-content:center;">
            <div style={`border-style: solid;width: 58.5vw;margin: 0.1rem;border-color: burlywood;height: 31.5vh;background-image: ${ document.getElementById("versionbanner-" + selectedMainVersion().id)?.style.backgroundImage};background-size: 24rem;background-size: cover;background-position: center;`}>
                  <h1 style="padding: 1rem;background-color: #c4dfffe0;margin: 2vh 5.5vw 1vh 5.5vw;display: block;border-radius:8px;">{selectedMainVersion().id}</h1>
                  </div>
              <div style="border-style: solid;width: 30vw;display: flex;flex-wrap: wrap;border-color: burlywood; height: 31.5vh;align-content: flex-start;">
              <For each={selectedVersions()}>{(version: {id: string, type: string }, i) => 
                <><div class="optionalVersion" use:selectVersion={version} id={"optionalversionbanner-" + version.id}> <h1>{version.id}</h1></div></>
              }</For>
              </div>
            </div>
        </div>
        
    </div>
    <div id="news-container" class="news-container" style={{"height": "63vh", "grid-template-rows": returnRows(mainversion())}}
    
    ref={newsElem}>

              {/* <For each={items} fallback={<><div class="news-item"></div> <div class="news-item"></div> <div class="news-item"></div></>}>
                {(item, index) => <div data-index={index()}>{item}</div>}
              </For> */}
              <For each={mainversion()}>{(version: {id: string, type: string }, i) => 
                <><div use:selectMainVersion={version} version-selected="false" class="news-item version-hover" id={"versionbanner-" + version.id} style={{
                  "background-image": `linear-gradient(rgb(103 103 103 / 40%), rgb(183 183 183 / 50%)),url(/versionBanner/${version.id}.jpg)`,
                  
                }}> <h1>{version.id}</h1></div></>
              }</For>
                {/* <div class="news-item"></div>
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
                <div class="news-item"></div> */}

              </div>
    <div style="position: relative;top: -20vh;display:flex;justify-content:center">
      <div style="background-color: #f0bdf4f7;width: 42vw;height: 21vh;border-radius: 10px;padding:1rem;display:flex;justify-content:center;flex-direction:column">
      <h1 style="padding:0.7rem">Play {selectedVersion().id}</h1>
                <button class="blob-btn" style="margin-left:5rem;margin-right:5rem"> <h3>{launchingText()}</h3>
                  <span class="blob-btn__inner">
                    <span class="blob-btn__blobs">
                      <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                    </span>
                  </span>
                </button>

    </div>
    </div>
  </div>
  );
};

export default Versions;

function renderElement() {
  throw new Error("Function not implemented.");
}
