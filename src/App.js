import React, {useState} from 'react';
import './App.css';
import Icon from "./components/Icon";
import {StateProvider} from "./AppContext";
import {loadConfiguration} from "./app-config";
import WindowManager from "./components/WindowManager";
import {reducer} from "./utils/reducer";

function App() {
    const config = loadConfiguration();

    // const [isMapOpen, setMapOpen] = useState(config.mapDefault);
    // const [isMenuOpen, setMenuOpen] = useState(config.menuDefault);
    // const [isMenuMapFinderOpen, setMenuMapFinderOpen] = useState(config.menuDefault);
    //
    // const toggleMap = () => {
    //     localStorage.setItem("mapOpen", JSON.stringify(!isMapOpen));
    //     setMapOpen(!isMapOpen);
    // };
    //
    // const toggleMenu = () => {
    //     localStorage.setItem("menuOpen", JSON.stringify(!isMenuOpen));
    //     setMenuOpen(!isMenuOpen)
    // };
    //
    // const toggleMapFinder = () => {
    //     localStorage.setItem("menuMapFinderOpen", JSON.stringify(!isMenuMapFinderOpen));
    //     setMenuMapFinderOpen(!isMenuMapFinderOpen)
    // };


    return (
        <StateProvider initialState={config} reducer={reducer}>
            <div className="App">
              <header className="App-header">

              </header>
                <Icon window="menuLocations" name="signs"/>
                {/*<Icon window="menuLocations" />*/}

               {/* {isMapOpen && <TreasureMap/>}*/}
               {/* {isMenuOpen && <MenuLocations onClick={toggleMenu}/>}*/}
               {/*<MenuMapFinder onClick={toggleMapFinder}/>*/}
               <WindowManager/>
            </div>
        </StateProvider>
  );
}

export default App;
