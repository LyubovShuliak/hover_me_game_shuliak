import { useState, MouseEvent, useEffect } from "react";
import { Mode } from "../../App";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import style from "./styles.module.css";

type SelectModeProps = {
  options: Mode[];
  setMode: (arg: Mode) => void;
  selectedMode: Mode | undefined;
  setStats: (el: string[] | undefined) => void;
};
const SelectMode = ({
  options,
  setMode,
  selectedMode,
  setStats,
}: SelectModeProps) => {
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Mode>();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Pick option:");

  useEffect(() => {
    if (!selected && selectedMode) {
      setSelected(selectedMode);
      setSelectedLabel(selectedMode.name);
    }
  }, [selected, selectedMode]);

  const onSelectButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (selected) {
      setMode(selected);
      setShowOptions(false);
      setError("");
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SELECTED_MODE,
        JSON.stringify(selected)
      );
      if (selected.name !== selectedMode?.name) {
        setStats([]);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.STATISTICS);
      }
    } else {
      setError("Please, select mode");
    }
  };

  const handleSelected = (option: Mode) => {
    setSelected(option);
    setSelectedLabel(option.name);
  };

  return (
    <div className={style.selectContainer}>
      <button className={style.select_button} onClick={onSelectButtonClick}>
        Start
      </button>

      <div className={style.modes}>
        <p className={style.error}>{error}</p>
        <div
          className={`${style.pick_button} ${
            selectedLabel !== "Pick option:" && style.pick_button_color
          }`}
          onClick={() => setShowOptions(!showOptions)}
        >
          <p>{selectedLabel} </p>
        </div>
        <div
          className={`${style.options} ${
            showOptions ? style.show : style.hide
          }`}
        >
          {options.map((option) => {
            return (
              <button key={option.field} onClick={() => handleSelected(option)}>
                {option.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectMode;
