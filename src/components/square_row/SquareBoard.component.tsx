import { useEffect, useState } from "react";
import { Mode, Stat } from "../../App";
import Square from "../square/Square.component";
import style from "./styles.module.css";

type SquareBoardProps = {
  rowCount: number;
  mode: Mode | undefined;
  setStats: (args: Stat[] | undefined) => void;
  stats: Stat[] | undefined;
};

const SquareBoard = ({ rowCount, mode, setStats, stats }: SquareBoardProps) => {
  const [row, setRow] = useState<number[][]>([]);

  useEffect(() => {
    const allSquares = Array.from(Array(rowCount).keys());
    const board = [];
    for (let index = 0; index < allSquares.length; index++) {
      board.push(
        Array.from(Array(rowCount).keys()).map((el, i) => rowCount * index + i)
      );
    }
    setRow(board);
  }, [rowCount]);

  return (
    <div className={style.col}>
      {row.length
        ? row.map((el, index) => {
            return (
              <div key={index} className={style.row}>
                {el.map((elem, i) => {
                  return (
                    <Square
                      key={elem}
                      column={i + 1}
                      mode={mode}
                      row={index + 1}
                      stats={stats}
                      setStats={setStats}
                    />
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SquareBoard;
