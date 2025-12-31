import React from "react";
import Routes from "./Routes";
import CountdownTimer from './components/ui/CountdownTimer';

function App() {
  return (
    <>
      <Routes />
      {/* Floating countdown visible across all pages (bottom-center) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <CountdownTimer />
      </div>
    </>
  );
}

export default App;
