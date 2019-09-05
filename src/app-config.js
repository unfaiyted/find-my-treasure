import MapFinderMenu from "./components/menus/map-finder-menu";
import LocationsMenu from "./components/menus/locations-menu";
import MapWindow from "./components/map/MapWindow";
import ActionsMenu from "./components/menus/actions-menu";

export const loadConfiguration = () => {

    const windows = {
        mapFinderMenu: {
            id: 'mapFinderMenu',
            component: MapFinderMenu,
            isOpen: false,
        },
        locationsMenu: {
            id: "locationsMenu",
            component: LocationsMenu,
            isOpen: true,
        },
        map: {
            id: "map",
            component: MapWindow,
            isOpen: true,
        },
        actionsMenu: {
            id: "actionsMenu",
            component: ActionsMenu,
            isOpen: false,
        }
    };


    return {
        windows,
        chosenLocation: null
    }

};
