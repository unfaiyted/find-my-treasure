import MenuMapFinder from "./components/MenuMapFinder";
import MenuLocations from "./components/MenuLocations";

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
        }
    };


    return {
        windows,
        chosenLocation: null
    }

};
