import { Stat } from "../../App";
import style from "./styles.module.css";

const HoveredSquaresStatistic = ({
  statistics,
}: {
  statistics: Stat[] | undefined;
}) => {
  return (
    <div className={style.container}>
      <h2>Hover Squares</h2>
      <div className={style.container_list}>
        {statistics &&
          statistics.map((el) => {
            return (
              <div key={el} className={style.stat_item}>
                <p>{el}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HoveredSquaresStatistic;
