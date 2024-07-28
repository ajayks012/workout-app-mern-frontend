import { AuthoContextProvider } from "./context/AuthContext";
import { AppRouter } from "./router/AppRouter";

const App = () => {
  return (
    <>
      <AuthoContextProvider>
        <div className="app">
          <AppRouter />
        </div>
      </AuthoContextProvider>
    </>
  );
};

export default App;
