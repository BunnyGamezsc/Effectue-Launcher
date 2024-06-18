import { createStore } from "solid-js/store";
import { settings } from "./Settings";
import { createEffect } from "solid-js";

const [appCache, setAppCache] = createStore<[{"id": string, "data": object}]>([])

createEffect(()=>{
    const idOfSettingsInArray = appCache.findIndex((item)=> item.id == "settings")
    setAppCache((prevCache) => ({
        [idOfSettingsInArray]: { ...prevCache[0], data: settings }, // Update properties of first object
      }));
})

// Extra Logic below (other functions, modifying settings)

function initAppCache(){
    setAppCache([
      {
        "id": "settings",
        "data": []
      },
      {
        "id": "mcVersions",
        "data":[]
      }
    ])
  }



export {appCache, setAppCache, initAppCache}