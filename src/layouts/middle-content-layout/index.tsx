import {RouterOutlet} from 'react-hook-guard';

function MiddleContentLayout(props: any) {
    return (
        <div className="flex align-middle items-center justify-center h-screen flex-col">
            <RouterOutlet {...props} />
        </div>
    );
}

export default MiddleContentLayout;
