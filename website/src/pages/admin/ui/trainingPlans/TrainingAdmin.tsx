import { useQuery } from "react-query";
import styles from "./Training.module.scss";
import { TrainingService } from "../../../../shared/api/training.service";
import { ITraining } from "../../../../shared/model/ITraining";
import CardTrainingAdmin from "../comments/CardTrainingAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ToggleTrainingAdmin from "../../../../components/ToggleTrainingAdmin";
import { CircularProgress, Typography } from "@mui/material";


interface TrainingProps {
  isAll?: boolean
}
export default function TrainingAdmin(props: TrainingProps) {
  // const { data } = useQuery(['trainingPlans'], () => TrainingService.getAll()
  // )
  const navigate = useNavigate();
  const location = useLocation();
  const { data: trainingPlansPublicData, isLoading: isLoadingPublic } = useQuery(['trainingPlansPublicAdmin'], () => TrainingService.getAllPublic()
  )
  const { data: trainingPlansAllData, isLoading: isLoadingAll } = useQuery(['trainingPlansAllAdmin'], () => TrainingService.getAll(),
  )
  const [alignment, setAlignment] = useState(props.isAll ? '/all' : '');

  useEffect(() => {
    if (location.pathname.includes("/all")) {
      setAlignment("/all");
    } else {
      setAlignment("");
    }
  }, [location.pathname]);



  const handleAlignmentChange = (newAlignment: string) => {
    navigate(`/admin/training${newAlignment}`);
    setAlignment(newAlignment);
  };

  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  return (
    <div>
      <div>
        <ToggleTrainingAdmin alignment={alignment} handleAlignmentChange={(newAlignment) => { handleAlignmentChange(newAlignment) }} />
        {alignment === "" ? isLoadingPublic ? (
          // Если данные загружаются
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              Загрузка...
            </Typography>
          </div>
        ) : Array.isArray(trainingPlansPublicData) && trainingPlansPublicData.length > 0 ? (
          trainingPlansPublicData.map((plan: ITraining) => (
            <CardTrainingAdmin key={plan.id} training={plan} isLikes isDelete />
          ))
        ) : (
          <p className={styles.text}>Нет опубликованных планов</p>
        ) : isLoadingAll ? (
          // Если данные загружаются
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
            <Typography variant="body1" sx={{ marginLeft: "10px" }}>
              Загрузка...
            </Typography>
          </div>
        ) : Array.isArray(trainingPlansAllData) && trainingPlansAllData.length > 0 ? (
          trainingPlansAllData.map((plan: ITraining) => (
            <CardTrainingAdmin key={plan.id} training={plan} isLikes isDelete />
          ))
        ) : (
          <p className={styles.text}>Нет опубликованных планов</p>
        )
        }
      </div>
    </div>
  )
}
