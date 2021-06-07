import {RouterOutlet, WithRouteProps} from 'react-hook-guard';

function MiddleContentLayout({route}: WithRouteProps) {
    return (
        <div className="flex align-middle items-center justify-center h-screen flex-col">
            <RouterOutlet routes={route?.children} />
        </div>
    );
}

export default MiddleContentLayout;
