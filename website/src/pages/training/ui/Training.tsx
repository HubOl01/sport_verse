import { useQuery } from "react-query";
import CardTraining from "./cardTraining";
import { ITraining } from '../../../shared/model/ITraining';
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./Training.module.scss";
import { useState } from "react";
import ToggleTraining from "../../../components/ToggleTraining";
import { useAuth } from "../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

interface TrainingProps {
  isPrivate?: boolean
}
export default function Training(props: TrainingProps) {
  const { user: USER } = useAuth();
  const navigate = useNavigate();
  const { data: trainingPlansPublicData } = useQuery(['trainingPlansPublic'], () => TrainingService.getAllPublic()
  )
  const { data: trainingPlansPrivateData } = useQuery(['trainingPlansPrivate'], () => TrainingService.getAllUser(Number(USER.userId!)),
    { enabled: !!USER.token }
  )
  const [alignment, setAlignment] = useState(props.isPrivate ? 'private' : 'public');

  const handleAlignmentChange = (newAlignment: string) => {
    navigate(`/training/${newAlignment}`);
    setAlignment(newAlignment);
  };
  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  return (
    <Box sx={{
      position: 'relative',
      justifyContent: 'center',
      justifyItems: 'stretch',
      width: "100%",
    }}>
      <ToggleTraining alignment={alignment} handleAlignmentChange={(newAlignment) => { handleAlignmentChange(newAlignment) }} />
      {alignment === "public" ? Array.isArray(trainingPlansPublicData) && trainingPlansPublicData.length > 0 ? (
        trainingPlansPublicData.map((plan: ITraining) => (
          <CardTraining key={plan.id} training={plan} countLikes={plan._count?.LikeTraining} />
        ))
      ) : (
        <p className={styles.text}>Нет опубликованных планов</p>
      ) : (Array.isArray(trainingPlansPrivateData) && trainingPlansPrivateData.length > 0 ? (
        trainingPlansPrivateData.map((plan: ITraining) => (
          <CardTraining key={plan.id} training={plan} isPrivateUser={alignment !== 'public'} />
        ))
      ) : (
        <p className={styles.text}>Нет планов</p>
      ))}
    </Box>
  )
}
