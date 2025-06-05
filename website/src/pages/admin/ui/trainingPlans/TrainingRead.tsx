import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TrainingRead.module.scss";
import { AppBar, Box, IconButton, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TrainingService } from "../../../../shared/api/training.service";
import { ITraining } from "../../../../shared/model/ITraining";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import Comments from "../../../training-detail/ui/comments/Comments";
import { Delete } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { GroupedExercises } from "../../../training-detail/ui/groupedExercises";

export default function TrainingDetailAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Состояние для открытия/закрытия диалога

  // Загрузка данных тренировки
  const { data: commentsData } = useQuery(["commentsCount", id], () => CommentPlanService.getAllPlanIdCount(id!.toString()));
  const {
    data: trainingData,
    isLoading,
    error,
  } = useQuery<ITraining>(['trainingDetail', id], () => TrainingService.get(id!));

  if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  if (!trainingData) return <p className={styles.text}>Нет плана</p>;

  // Форматирование даты
  const formattedDateCreated = new Date(trainingData.date_created!).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Обработчик открытия диалога подтверждения
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  // Обработчик закрытия диалога подтверждения
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Обработчик удаления тренировки
  const handleDelete = async () => {
    try {
      await TrainingService.delete(id!);
      queryClient.invalidateQueries('trainingPlans');
      navigate(-1);
    } catch (error) {
      console.error('Ошибка при удалении тренировочного плана:', error);
      alert('Не удалось удалить тренировочный план.');
    } finally {
      handleCloseDeleteDialog();
    }
  };
  const handleTogglePrivate = async () => {
    try {
      await TrainingService.updateTogglePrivate(Number(id!));
      queryClient.invalidateQueries('trainingPlans');
      // navigate(-1);
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при скрытии тренировочного плана:', error);
      alert('Не удалось скрыть тренировочный план.');
    }
  };

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
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            edge="end"
            onClick={handleTogglePrivate}
          >
            {trainingData.isPrivate === 1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <Box sx={{ width: 20 }}></Box>
          <IconButton
            edge="end"
            sx={{ color: 'red' }}
            onClick={handleOpenDeleteDialog}
          >
            <Delete />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '1rem' }}>
        <div className="mr-5 ml-5">
          <h1>{trainingData.title}</h1>
          <p>Вид спорта: {trainingData.sportType!.title}</p>
          <p>Описание: {trainingData.description}</p>
          <div className={`${styles.name} mb-5`}>Упражнения</div>
          <div>
            {Array.isArray(trainingData.PlanExercise) && trainingData.PlanExercise!.length > 0 ? (
              <GroupedExercises planExercises={trainingData.PlanExercise ?? []} />
            ) : (
              <p>Упражнений пока нет.</p>
            )}
          </div>
          <p className={styles.date}>Опубликовано: {formattedDateCreated}</p>

          <div>
            <h2>Комментарии ({commentsData}): </h2>
            <Comments idTraining={id!} isAdmin={true} training={trainingData} />
          </div>
        </div>
      </Box>

      {/* Диалоговое окно подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить тренировку "{trainingData.title}"? Это действие нельзя отменить.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}