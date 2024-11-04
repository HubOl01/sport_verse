import { useQuery } from "react-query";
import CardTraining from "./cardTraining";
import { ITraining } from '../../../shared/model/ITraining';
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./Training.module.scss";

export default function Training() {
  const { data, isLoading, error } = useQuery(['training'], () => TrainingService.getAll()
  )

  if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  console.log(data, error)
  return (
    <div>

      {Array.isArray(data) && data.length > 0 ? (
        data.map((plan: ITraining) => (
          <CardTraining key={plan.id} training={plan} />
        ))
      ) : (
        <p>Нет планов</p>
      )}
    </div>
  )
}
