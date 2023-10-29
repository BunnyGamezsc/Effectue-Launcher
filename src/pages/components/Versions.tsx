import { invoke } from "@tauri-apps/api";
import { Component, For, createSignal, onMount } from "solid-js";
import { renderToString } from "solid-js/web";
import isOnline from 'is-online';

const Versions: Component = () => {
  // get the current minecraft version
  //     20
  // get the next version x3
  //     19,18,17
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  let newsElem: HTMLDivElement | undefined;
  const [version, setVersion] = createSignal([20])
  const [selectedVersion, setselectedVersion] = createSignal({"id": "1.20", "type": "release", "url": "", "time": "", "releaseTime": ""})
  const [mainversion, setmainVersion] = createSignal([
    {
        "id": "1.20",
        "type": "0",
        "url": "0",
        "time": "0",
        "releaseTime": "0"
    }
])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const selectVersion = (el: Element, value) => {
  el.addEventListener("click",()=>{
    setselectedVersion(value);
    console.log(selectedVersion())
    for (const child of el.parentElement!.children){
      child.setAttribute("version-selected", "false")
    }
    el.setAttribute("version-selected", "true")
  })
}
  onMount(()=>{
   console.log(selectedVersion()) 
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
        console.log(data)
        console.log("[Server] " + data)
        if (typeof data == "undefined"){
          console.log("error: " + "")
        return
        }
        const dataa = data
        const latest = dataa.latest.release
        const versions = dataa.versions.filter((versionBlock)=>{
          console.log(versionBlock.id)
          console.log(Number(versionBlock.id))
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
        const mainVersions = versions.filter((idBlock) =>{
          // console.log(idBlock.id)
          // console.log(Number(idBlock.id))
          if (isNaN(Number(idBlock.id))){
            return false
          }else{
            return idBlock.id
          }
        })
        
        console.log(latest)
        
        console.warn(versions)
        // console.log(mainVersions)
        // let g = mainVersions
        // g.push({"id": "0.1", "type": "release", "url": "", "time": "", "releaseTime": ""})
        // setmainVersion(g)
        // console.error(mainversion())
        setmainVersion(mainVersions)
        console.log(mainversion())
        let cool = mainVersions[0]
        setselectedVersion(cool)

        // 
        //  CHANGE WHICH VERSIONS WHICH HAVE BANNERS
        //
        const versionBannerFiles = ["1.20","1.19","1.18","1.17","1.16","1.15","1.14","1.13","1.12","1.11","1.9","1.6"]
        let unsetBannerFiles: string | string[] = []
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
  function returnRows(arg0: { id: string; type: string; url: string; time: string; releaseTime: string; }[]): import("csstype").Property.GridTemplateRows<0 | (string & {}) > | undefined {
    let rowsarr = []
    for (let i = 0; i < Math.round((arg0.length/3 + 0.49999999)); i++) {
      rowsarr.push("var(--newsRow)")
    }
    console.log(rowsarr.length)
    return rowsarr.join(" ")
  }

  return (
  <div class="launcher" style="animation: opacityFade 0.5s forwards;">
    <div class="play" style="height: 33vh;">
        <div class="banner versgrad" style="display:flex;width:89.7vw;justify-content:center;align-items:center;">
            <div style="margin-bottom:auto;display:flex;/* gap:2rem; */ flex-direction:row;justify-content:center;">
            <div style="border-style: solid;width: 58.5vw;margin: 0.1rem;border-color: burlywood;height: 31.5vh;">
                  
                  </div>
              <div style="border-style: solid;width: 30vw;margin: 0.1rem;border-color: burlywood;height: 31.5vh;">
                  
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
                <><div use:selectVersion={version} version-selected="false" class="news-item version-hover" id={"versionbanner-" + version.id} style={{
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
    <div>

    </div>
  </div>
  );
};

export default Versions;