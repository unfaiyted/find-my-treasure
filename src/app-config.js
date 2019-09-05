import MenuMapFinder from "./components/menus/MenuMapFinder";
import MenuLocations from "./components/menus/MenuLocations";
import MapWindow from "./components/map/MapWindow";

export const loadConfiguration = () => {

    const mapDefault = (localStorage.getItem("mapOpen") === "true");
    const menuDefault = (localStorage.getItem("menuOpen") === "true");

    const windows = {
        menuMapFinder: {
            id: 'menuMapFinder',
            component: MenuMapFinder,
            isOpen: false,
        },
        menuLocations: {
            id: "menuLocations",
            component: MenuLocations,
            isOpen: true,
        },
        map: {
            id: "map",
            component: MapWindow,
            isOpen: true,
        }
    };


    return {
        windows,
        chosenLocation: null
    }

};
