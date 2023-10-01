import { invoke } from "@tauri-apps/api";
import { Component, For, createSignal, onMount } from "solid-js";
import { renderToString } from "solid-js/web";
import isOnline from 'is-online';

const Verisons: Component = () => {
  // get the current minecraft version
  //     20
  // get the next version x3
  //     19,18,17
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  let newsElem: HTMLDivElement | undefined;
  const [version, setVersion] = createSignal([20])
  const [mainversion, setmainVersion] = createSignal([
    {
        "id": "1.20",
        "type": "0",
        "url": "0",
        "time": "0",
        "releaseTime": "0"
    }
])

  onMount(()=>{
  
    setmainVersion([])
    const temp_version = version()
    for (let index = 0; index < version()[0]; index!++){
      const ii = index + 1
      temp_version.push(version()[0] - ii)
    }
    temp_version.pop()
    let displayVersions = temp_version
    // setVersion(temp_version)
    // console.log(temp_version)
    // invoke("get_mojang_versions").then((returnData)=>{
    //   console.log(returnData)
    // })
    // fetch("https://pston-meta.mojang.com/mc/game/version_manifest.json")
    // .then(async r => {
    //   const json = r.json()
    //   const isJson = r.headers.get('content-type')?.includes('application/json');
    //   const data = isJson ? json : null;
    //   if (!r.ok) {
    //     // get error message from body or default to response status
    //     const error = (data && data.message) || r.status;
    //     return Promise.reject(error);
    // }
    //   return json})
    // .then((data) =>{
    //   // const data = r.json();
    //   console.log(data)
    //   console.log("[Server] " + data)
    //   if (typeof data == "undefined"){
    //     console.log("error: " + "")
    //   return
    //   }
    //   const dataa = data as unknown as {latest: {release: string}, versions: [ 
    //     {id: string, type: string, url: string, time: string, releaseTime: string}]}
    //   const latest = dataa.latest.release
    //   const versions = dataa.versions.filter((versionBlock: { type: string; })=>{
    //     // console.log(versionBlock.type)
    //     if(versionBlock.type === "release"){
    //       return versionBlock.type
    //     }else{
    //       return false
    //     }
    //   })
    //   const mainVersions = versions.filter((idBlock: { id: string; }) =>{
    //     if (isNaN(Number(idBlock.id))){
    //       return false
    //     }else{
    //       return idBlock.id
    //     }
    //   })
      
    //   console.log(latest)
    //   console.log(versions)
    //   console.log(mainVersions)
    //   setmainVersion(mainVersions)
    //   console.log(mainversion())
    // }).catch(error => {
    //   // console.log(error)
    //   // console.log(newsElem!.innerHTML)
    //   newsElem.outerHTML = '<div style="position: relative;top: -26rem;left: 4vw;padding-top: 90vh;" id="loadingDIV"><h1>Loading...</h1></div>';
    //   // newsElem.style.display = 'block';
    //   console.error(`[Effectue Server] ${error}`);
    // })
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
          // console.log(versionBlock.type)
          if(versionBlock.type === "release"){
            return versionBlock.type
          }else{
            return false
          }
        })
        const mainVersions = versions.filter((idBlock) =>{
          if (isNaN(Number(idBlock.id))){
            return false
          }else{
            return idBlock.id
          }
        })
        
        console.log(latest)
        console.log(versions)
        // console.log(mainVersions)
        setmainVersion(mainVersions)
        console.log(mainversion())


        const versionBannerFiles = ["1.20","1.19","1.18","1.17","1.16","1.15","1.9"]
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
    <div id="news-container" class="news-container" style="height: 63vh;
    
    " ref={newsElem}>

              {/* <For each={items} fallback={<><div class="news-item"></div> <div class="news-item"></div> <div class="news-item"></div></>}>
                {(item, index) => <div data-index={index()}>{item}</div>}
              </For> */}
              <For each={mainversion()}>{(version: {id: string }, i) => 
                <><div class="news-item version-hover" id={"versionbanner-" + version.id} style={{
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

export default Verisons;