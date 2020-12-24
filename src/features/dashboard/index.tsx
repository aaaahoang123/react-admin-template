import React from 'react';
import FileUpload from '../../common/components/FileUpload';

function Dashboard(props: any) {
    console.log(props);
    return (
        <div>
            <FileUpload onChange={(val) => console.log(val)} valueMode={'multiple'} compressRatio={0.6} />
        </div>
    )
}

export default Dashboard;
