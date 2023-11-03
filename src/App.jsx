
import { auth } from './config/firebase/';
import AppRouter from "./AppRouter";

const App = () => {
  const user = auth.currentUser;

  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
