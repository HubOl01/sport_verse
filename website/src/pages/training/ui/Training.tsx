import { useQuery } from "react-query";
import CardTraining from "./cardTraining";
import { ITraining } from '../../../shared/model/ITraining';
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./Training.module.scss";
import { useEffect, useState } from "react";
import ToggleTraining from "../../../components/ToggleTraining";
import { useAuth } from "../../../shared/utils/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

interface TrainingProps {
  isPrivate?: boolean
}
export default function Training(props: TrainingProps) {
  const { user: USER } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: trainingPlansPublicData, isLoading: isLoadingPublic } = useQuery(['trainingPlansPublic'], () => TrainingService.getAllPublic()
  )
  const { data: trainingPlansPrivateData, isLoading: isLoadingPrivate } = useQuery(['trainingPlansPrivate'], () => TrainingService.getAllUser(Number(USER.userId!)),
    { enabled: !!USER.token }
  )
  const [alignment, setAlignment] = useState(props.isPrivate ? '/private' : '');

  useEffect(() => {
    if (location.pathname.includes("/private")) {
      setAlignment("/private");
    } else {
      setAlignment("");
    }
  }, [location.pathname]);



  const handleAlignmentChange = (newAlignment: string) => {
    navigate(`/training${newAlignment}`);
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
      {alignment === "" ? isLoadingPublic ? (
        // Если данные загружаются
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
          <Typography variant="body1" sx={{ marginLeft: "10px" }}>
            Загрузка...
          </Typography>
        </div>
      ) :
        Array.isArray(trainingPlansPublicData) && trainingPlansPublicData.length > 0 ? (
          trainingPlansPublicData.map((plan: ITraining) => (
            <CardTraining key={plan.id} training={plan} countLikes={plan._count?.LikeTraining} />
          ))
        ) : (
          <p className={styles.text}>Нет опубликованных планов</p>
        ) : isLoadingPrivate ? (
          // Если данные загружаются
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              Загрузка...
            </Typography>
          </div>
        ) : (Array.isArray(trainingPlansPrivateData) && trainingPlansPrivateData.length > 0 ? (
          trainingPlansPrivateData.map((plan: ITraining) => (
            <CardTraining key={plan.id} training={plan} isPrivateUser={alignment !== ''} />
          ))
        ) : (
          <p className={styles.text}>Нет планов</p>
        ))}
    </Box>
  )
}
