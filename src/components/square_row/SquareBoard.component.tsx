import { useEffect, useState } from "react";
import { v4 } from "uuid";
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
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    const allSquares = Array.from(Array(rowCount).keys());
    const newBoard = [];
    for (let index = 0; index < allSquares.length; index++) {
      newBoard.push(Array.from(Array(rowCount).keys()).map((_) => v4()));
    }
    setBoard(newBoard);
  }, [rowCount]);

  return (
    <div className={style.col}>
      {board.length &&
        board.map((el, index) => {
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
        })}
    </div>
  );
};

export default SquareBoard;
