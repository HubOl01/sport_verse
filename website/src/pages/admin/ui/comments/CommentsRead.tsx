import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CommentsRead.module.scss";
import { AppBar, Box, Chip, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import { TrainingService } from "../../../../shared/api/training.service";
import { ITraining } from "../../../../shared/model/ITraining";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import Comments from "../../../training-detail/ui/comments/Comments";

export default function CommentsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Обработчик клика по иконке "Поделиться"
  const { data: commentsData } = useQuery(["commentsCount", id], () => CommentPlanService.getAllPlanIdCount(id!.toString()))
  const {
    data: trainingData,
    isLoading,
    error
  } = useQuery<ITraining>(['trainingDetailComment', id], () => TrainingService.get(id!));

  useEffect(() => {
    if (commentsData) {
      queryClient.invalidateQueries(['commentsCount', id]);
    }
  });
  if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  if (!trainingData) return <p className={styles.text}>Нет плана</p>;

  // Форматирование даты
  const formattedDateCreated = new Date(trainingData.date_created!).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });


  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Шапка (AppBar) */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate(-1);
              navigate(`/training`);
            }}
          >
            <ArrowBackIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Основной контент */}
      <Box sx={{ padding: '1rem', paddingBottom: '80px' /* чтобы не закрывал футер */ }}>
        <div className="mr-5 mt-5 ml-5">
          <Chip className="mb-2" label={trainingData.statusPublish!.title} />
          <h1>{trainingData.title}</h1>
          <p>Вид спорта: {trainingData.sportType!.title}</p>
          <p>Описание: {trainingData.description}</p>
          <p className={styles.date}>Опубликовано: {formattedDateCreated}</p>

          <div>
            <h2>Комментарии ({commentsData}): </h2>
            <Comments idTraining={id!} isAdmin={true} />
          </div>

        </div>
      </Box>

    </Box>
  );
}
