import { useQuery } from "react-query";
import CardTraining from "./cardTraining";
import { ITraining } from '../../../shared/model/ITraining';
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./Training.module.scss";
import { useState } from "react";
import ToggleTraining from "../../../components/ToggleTraining";

export default function Training() {
  const { data: trainingPlansPublicData } = useQuery(['trainingPlansPublic'], () => TrainingService.getAllPublic()
  )
  const { data: trainingPlansPrivateData } = useQuery(['trainingPlansPrivate'], () => TrainingService.getAllPrivate(1)
  )
  const [alignment, setAlignment] = useState('public');

  const handleAlignmentChange = (newAlignment: string) => {
    setAlignment(newAlignment);
  };
  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  return (
    <div>
      <ToggleTraining alignment={alignment} handleAlignmentChange={(newAlignment) => { handleAlignmentChange(newAlignment) }} />
      <div style={{
        maxHeight: "75vh",
        overflowY: "auto",
      }}>

        {alignment === "public" ? Array.isArray(trainingPlansPublicData) && trainingPlansPublicData.length > 0 ? (
          trainingPlansPublicData.map((plan: ITraining) => (
            <CardTraining key={plan.id} training={plan} />
          ))
        ) : (
          <p className={styles.text}>Нет опубликованных планов</p>
        ) : (Array.isArray(trainingPlansPrivateData) && trainingPlansPrivateData.length > 0 ? (
          trainingPlansPrivateData.map((plan: ITraining) => (
            <CardTraining key={plan.id} training={plan} />
          ))
        ) : (
          <p className={styles.text}>Нет планов</p>
        ))}
      </div>
    </div>
  )
}
