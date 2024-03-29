import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// To resize the thing
document.addEventListener('onOverlayStateUpdate', function(e) {
    if (!e.detail.isLocked)
        document.documentElement.classList.add('resizeHandle');
    else
        document.documentElement.classList.remove('resizeHandle');
});


document.addEventListener('onPlayerChangedEvent', function(e) {
    console.log('playerchangedevent',e) //can detect player movement

});

document.addEventListener('onZoneChangedEvent', function(e) {
    console.log('zoneChanged',e)
});
document.addEventListener('onLogEvent', function(e) {
    //current log happenings
    console.log('logEvent',e)
});



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
