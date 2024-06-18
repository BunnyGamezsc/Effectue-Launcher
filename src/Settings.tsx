import { createStore } from "solid-js/store";

const [settings, setSettings] = createStore<[{"id": string, "data": object}]>([]);

// Extra Logic below (other functions, modifying settings)

function initSettings(){
  setSettings([
    {
      "id": "lastUsedVersions",
      "data": [
        {"id": "1.20"},
        {"id": "1.16.1"},
        {"id": "1.15"}
      ]
    },
    {
      "id": "pinnedClients",
      "data":[
        {"clientId": "effectue"} 
      ]
    }
  ])
}



export {settings, setSettings, initSettings};