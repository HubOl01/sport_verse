import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./TrainingRead.module.scss";
import { ITraining } from '../../../shared/model/ITraining';
import { AppBar, Chip, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<ITraining>(
    ['trainingDetail', id],
    () => TrainingService.get(id!)
  );

  if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  if (!data) return <p className={styles.text}>Нет плана</p>;

  const formattedDateCreated = new Date(data.date_created!).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="mr-5 mt-5 ml-5">
        <Chip className="mb-2" label={data.statusPublish!.title} />
        <h1>{data.title}</h1>
        <p>Вид спорта: {data.sportType!.title}</p>
        <p>Описание: {data.description}</p>
        <div className={`${styles.name} mb-5`}>Упражения</div>
        <p className={styles.date}>Опубликовано: {formattedDateCreated}</p>
      </div>
    </>
  );
}
