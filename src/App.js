import React, { useState } from "react";
import { Card } from "antd";
import { DataProvider } from "./context/DataContext";
import StoreMap from "./components/StoreMap";
import StoreCharts from "./components/StoreCharts";
import AppLayout from "./components/AppLayout";
import { NAVIGATION_ITEMS, DEFAULT_VIEW, VIEWS } from "./constants/navigation";

const App = () => {
  const [currentView, setCurrentView] = useState(DEFAULT_VIEW);
  const currentNav = NAVIGATION_ITEMS.find((item) => item.key === currentView);

  return (
    <DataProvider>
      <AppLayout currentView={currentView} setCurrentView={setCurrentView}>
        <Card title={currentNav?.cardTitle || ""}>
          {currentView === VIEWS.MAP && <StoreMap />}
          {currentView === VIEWS.CHARTS && <StoreCharts />}
        </Card>
      </AppLayout>
    </DataProvider>
  );
};

export default App;
