import {
  Component,
  Index,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

const Testing: Component = () => {
  const [modSearchName, setModSearchName] = createSignal("sodium");
  const [queryVersion, setQueryVersion] = createSignal("");

  // SPECIFIC VERSION QUERYING - RESULTS (of published versions), Fist Result (most recent and has correct MINECRAFT VERSION compatibility),
  // versionID of the SPECIFIC MODRINTH MOD VERSION

  // "versionID" will be used to check if latest mod version is different than currently stored version

  const [modVersionResults, setModVersionResults] = createSignal([]);
  const [modVersionFirstResult, setModVersionFirstResult] = createSignal("");
  const [versionID, setVersionID] = createSignal("");

  // MOD QUERYING - Results, First Result (Most applicable first), modID of the MODRINTH PROJECT
  // "modID" will be used to find other things about the project like MODRINTH MOD VERSIONS and other data
  const [modQueryResults, setModQueryResults] = createSignal([]);
  const [modQueryFirstResult, setModQueryFirstResult] = createSignal({});
  const [modID, setModID] = createSignal("");

  const queryVersions = () => {
    fetch(
      `https://api.modrinth.com/v2/project/${modID()}/version?game_versions=["${queryVersion()}"]`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((versions) => {
        console.warn("VERSIONS FOR " + modID());
        console.warn(versions);
        setModVersionResults(versions);
        setVersionID(versions[0].id);
        setModVersionFirstResult(versions[0]);
      });
  };
  const queryMods = () => {
    fetch(
      `https://api.modrinth.com/v2/search?query=${modSearchName()}&facets=[["categories:fabric"],["project_type:mod"]]`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.error(data.hits);
        return data.hits;
      })
      .then((modQueryResults) => {
        console.warn(modQueryFirstResult());
        setModQueryFirstResult(modQueryResults[0]);
        setModQueryResults(modQueryResults);
        setModID(modQueryFirstResult().project_id);
        queryVersions();
      });
  };
  const changeQuery = () => {
    setModSearchName(document.getElementById("queryText").value);
    setQueryVersion(document.getElementById("versionQueryText").value);
    queryMods();
  };

  return (
    <>
      <h1>Enter the mod name - Powered by Modrinth</h1>
      <input id="queryText" type="text"></input>
      <input id="versionQueryText" type="text"></input>
      <button onclick={changeQuery}>Query!</button>
      <div style="color:black;">
        <div>
          <h3>Query Results</h3>
          <Index each={modQueryResults()}>
            {(result) => {
              return (
                <p>
                  {JSON.stringify(result().downloads)}:{" "}
                  {JSON.stringify(result().title)} by{" "}
                  {JSON.stringify(result().author)}
                </p>
              );
            }}
          </Index>
        </div>
        <div>
          <h3>Mod Details</h3>
          <div>
            <div style="background-color: aliceblue;display: flex;width: fit-content;padding: 10px;flex-direction: column;gap:1rem;height:40vh">
              <div style="display: flex;width: fit-content;flex-direction: row;gap:1rem;">
                <img
                  src={modQueryFirstResult().icon_url}
                  alt=""
                  width="90px"
                  height="90px"
                />
                <div>
                  <p>
                    {" "}
                    ID: {modQueryFirstResult().project_id} Downloads:{" "}
                    {modQueryFirstResult().downloads}
                  </p>
                  <h2 style="font-family: American Typewriter">
                    {" "}
                    <em style="font-family: American Typewriter; font-weight:500">
                      {modQueryFirstResult().title}
                    </em>{" "}
                    by {modQueryFirstResult().author}
                  </h2>
                </div>
              </div>
              <div
                style="height: max-content;overflow: scroll;width: initial;display: grid; grid-template-columns: auto auto auto;"
              >
                <Index each={modQueryFirstResult().versions}>
                  {(version) => {
                    return <p>{version()}</p>;
                  }}
                </Index>
              </div>
            </div>
            {JSON.stringify(modQueryFirstResult())}
          </div>
        </div>
        <div>
          <h3>Versions</h3>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Testing;
