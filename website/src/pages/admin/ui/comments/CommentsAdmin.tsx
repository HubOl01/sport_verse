import { useQuery } from "react-query";
import { ITraining } from "../../../../shared/model/ITraining";
import { TrainingService } from "../../../../shared/api/training.service";
import CardTrainingComments from "./CardTrainingComments";

export default function CommentsAdmin() {
  const { data } = useQuery(['trainingPlans'], () => TrainingService.getAll()
  )

  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((plan: ITraining) => (
          <CardTrainingComments key={plan.id} training={plan} />
        ))
      ) : (
        <p>Нет планов</p>
      )}
    </div>
  )
}
