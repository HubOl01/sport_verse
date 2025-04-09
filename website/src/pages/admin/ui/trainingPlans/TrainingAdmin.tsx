import { useQuery } from "react-query";
import styles from "./Training.module.scss";
import CardTraining from "../../../training/ui/cardTraining";
import { TrainingService } from "../../../../shared/api/training.service";
import { ITraining } from "../../../../shared/model/ITraining";

export default function TrainingAdmin() {
  const { data } = useQuery(['trainingPlans'], () => TrainingService.getAll()
  )

  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  return (
    <div>
      <div style={{
        maxHeight: "75vh",
        overflowY: "auto",
      }}>

        {Array.isArray(data) && data.length > 0 ? (
          data.map((plan: ITraining) => (
            <CardTraining key={plan.id} training={plan} />
          ))
        ) : (
          <p className={styles.text}>Нет опубликованных планов</p>
        )}
      </div>
    </div>
  )
}
