import {Store} from 'redux';
import {changeWindowSize} from '../App.actions';

function listenViewResize(store: Store<any, any>) {
    const listenResizeChange = () => {
        const { innerWidth: width, innerHeight: height } = window;
        store.dispatch(changeWindowSize({width, height}));
    }
    listenResizeChange();
    window.addEventListener('resize', listenResizeChange);
}

export default listenViewResize;
