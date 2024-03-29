import { RouterOutlet } from 'react-hook-guard';
import appRoutes from './App.routes';

function App() {
    return <RouterOutlet routes={appRoutes} relativeMode={true} />;
}

export default App;
