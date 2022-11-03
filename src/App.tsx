import React, { useEffect, useState } from "react";

import style from "./App.module.css";
import SquareBoard from "./components/square_row/SquareBoard.component";
import SelectMode from "./components/select_mode/SelectMode.component";

import HoveredSquaresStatistic from "./components/hovered_squares/HoveredSquaresStatistic.component";
import { LOCAL_STORAGE_KEYS, MODES_URL } from "./constants";

export type Mode = { name: string; field: number };
export type Stat = string;

function App() {
  const [modes, setModes] = useState<Mode[]>();
  const [selectedMode, setSelectedMode] = useState<Mode>();
  const [stats, setStats] = useState<Stat[] | undefined>();

  useEffect(() => {
    const statistics = localStorage.getItem(LOCAL_STORAGE_KEYS.STATISTICS);
    if (statistics) {
      const savedStats = JSON.parse(statistics);
      setStats(savedStats);
    }
    getFieldCount();
    handleSelectMode();
  }, []);

  const getFieldCount = async () => {
    const modes = localStorage.getItem(LOCAL_STORAGE_KEYS.MODES_KEY);
    if (modes) {
      setModes(JSON.parse(modes));
    } else {
      const fetchedModesResponse = await fetch(MODES_URL);
      const fetchedModes = await fetchedModesResponse.json();
      setModes(fetchedModes);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.MODES_KEY,
        JSON.stringify(fetchedModes)
      );
    }
  };
  const handleSelectMode = () => {
    const selectedModeFromStorage = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_MODE
    );
    if (selectedModeFromStorage) {
      console.log(selectedModeFromStorage);

      setSelectedMode(JSON.parse(selectedModeFromStorage));
    }
  };

  return (
    <div className={style.App}>
      <div className={style.playboard}>
        <SelectMode
          options={modes || []}
          setMode={setSelectedMode}
          selectedMode={selectedMode}
          setStats={setStats}
        />
        <div className={style.board}>
          <SquareBoard
            rowCount={selectedMode ? selectedMode.field : 0}
            mode={selectedMode}
            setStats={setStats}
            stats={stats}
          />
        </div>
      </div>
      <HoveredSquaresStatistic statistics={stats} />
    </div>
  );
}

export default App;
