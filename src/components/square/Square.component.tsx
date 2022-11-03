import { type } from "os";
import { useCallback, useEffect, useState } from "react";
import { Mode, Stat } from "../../App";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import style from "./styles.module.css";

type SquareProps = {
  column: number;
  mode: Mode | undefined;
  row: number;
  stats: Stat[] | undefined;
  setStats: (args: Stat[] | undefined) => void;
};

const Square = ({ column, mode, row, stats, setStats }: SquareProps) => {
  const [hovered, setHovered] = useState(false);
  const [currentMode, setCurrentMode] = useState("");

  useEffect(() => {
    if (stats) {
      const statString = `col ${column} row ${row}`;
      if (stats.includes(statString)) {
        setHovered(true);
      }
    }
  }, []);

  useEffect(() => {
    if (mode && mode.name !== currentMode && currentMode) {
      setCurrentMode(mode.name);
      delete localStorage[LOCAL_STORAGE_KEYS.STATISTICS];
      setStats([]);
    }
  }, [currentMode, mode]);

  useEffect(() => {
    if (!stats || !stats.length) {
      setHovered(false);
    }
  }, [stats]);

  useEffect(() => {
    handleStatsChange();
  }, [column, hovered, row]);

  const handleStatsChange = useCallback(() => {
    const statString = `col ${column} row ${row}`;
    if (stats?.includes(statString) && !hovered) {
      setStats(stats.filter((el) => el !== statString));
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.STATISTICS,
        JSON.stringify(stats)
      );

      return;
    }
    if (stats && !stats.includes(statString) && hovered) {
      setStats([...(stats || []), statString]);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.STATISTICS,
        JSON.stringify(stats)
      );
      return;
    }
    if (!stats && hovered) {
      setStats([statString]);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.STATISTICS,
        JSON.stringify(stats)
      );
    }
  }, [column, hovered, row, setStats, stats]);

  return (
    <div
      className={`${style.square} ${
        hovered ? style.hovered : style.not_hovered
      } `}
      onMouseOver={() => {
        setHovered(!hovered);
      }}
    ></div>
  );
};

export default Square;
