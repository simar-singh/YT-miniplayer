import { useState, useEffect, useRef } from 'react'

const IndexPage = () => {
  const [id, setId] = useState("");
  const [focused, onFocused] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    const deep = global.ipcRenderer.sendSync('get-deep');
    if(deep) {
      setId(deep);
      spawnWindow();
    }
  });

  useEffect(() => {
    if(!focused && inputEl.current.value) {
      inputEl.current.focus();
    }
  })

  function spawnWindow() {
    const i = id.substr(id.indexOf("?v=")+3);
    inputEl.current.value = "";
    global.ipcRenderer.send('spawnWindow', [i.toString()]);
  }

  return (
    <div className="bg-gray-900 w-screen h-screen">
      <div className="input w-screen relative top-1/3 bottom-1/3">    
        <input ref={inputEl} onFocus={() => onFocused(true)} onBlur={() => onFocused(false)} onChange={(e) => setId(e.target.value)} type="text" id="input-a"/>  
        <label htmlFor="input-a" className=""> Youtube URL:</label>
        <div onClick={() => spawnWindow()} className="no-text-highlight button mx-20 text-center">Watch</div>
        <p className="text-sm text-center mt-10" style={{ color: "#44cfcb" }}>* If this is your first time opening the application, please close and reopen it</p>
      </div>
    </div>
  );
}

export default IndexPage