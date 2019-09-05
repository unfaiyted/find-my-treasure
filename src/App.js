import React, {useState} from 'react';
import './css/app.scss';
import Icon from "./components/ui/Icon";
import {StateProvider} from "./AppContext";
import {loadConfiguration} from "./app-config";
import WindowManager from "./components/WindowManager";
import {reducer} from "./utils/reducer";
import HotkeyManager from "./components/HotkeyManager";

function App() {
    const config = loadConfiguration();

    return (
        <StateProvider initialState={config} reducer={reducer}>
            <div className="App">
              <header className="App-header">

              </header>
                <Icon window="locationsMenu" name="signs"/>
                <Icon window="actionsMenu" name="main" width={30} height={30} noOverlay/>
               <HotkeyManager/>
               <WindowManager/>
            </div>
        </StateProvider>
  );
}

export default App;
