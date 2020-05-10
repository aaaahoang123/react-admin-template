import {Store} from 'redux';
import {onResizeWindow} from '../App.actions';

function listenViewResize(store: Store<any, any>) {
    const listenResizeChange = () => {
        const { innerWidth: width, innerHeight: height } = window;
        store.dispatch(onResizeWindow(width, height));
    }
    listenResizeChange();
    window.addEventListener('resize', listenResizeChange);
}

export default listenViewResize;
