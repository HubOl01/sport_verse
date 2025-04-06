import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./TrainingRead.module.scss";
import { ITraining } from '../../../shared/model/ITraining';
import { AppBar, Box, Card, CardActions, Chip, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PlanExerciseService } from "../../../shared/api/planExercise.service";
import { ExercisesService } from "../../../shared/api/exercises.service";
import DeleteIcon from '@mui/icons-material/Delete';
import TrainingEdit from "../../training-edit/ui/TrainingEdit";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { PiShareFat } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import { BiCommentDetail } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import ThumbUpOn from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOff from '@mui/icons-material/ThumbUpOffAlt';
import { ColorBackground } from "../../../shared/styles/colors";
import { DialogShare } from "./dialogShare";
import { ExerciseSetService } from "../../../shared/api/exerciseSet.service";

function ExerciseCard({ exerciseId, index, planExerciseId }: { exerciseId: number; index: number; planExerciseId: number }) {
  const { data: exerciseData } = useQuery(
    ['exercise', exerciseId],
    () => ExercisesService.get(exerciseId.toString())
  );
  const { data: exerciseSetData } = useQuery(
    ['exerciseSet', exerciseId],
    () => ExerciseSetService.getOnePlanExercises(planExerciseId),
  );

  return (
    <Card
      className="justify-center content-center self-center"
      variant="outlined"
      sx={{
        marginBottom: '20px',
        borderRadius: '20px',
      }}
    >
      <div className="flex self-center p-2 pr-3 pl-3 justify-between">
        <div className="flex">
          <div style={{ fontSize: "16px", alignSelf: 'center', paddingRight: "10px" }}>{index}. </div>
          <div style={{ fontSize: "16px" }}>
            {exerciseData?.name}
          </div>

        </div>
        <div style={{ fontSize: "16px" }}>
          {exerciseSetData?.repetitions} раз.
        </div>
      </div>

    </Card>
  );
}



export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [edit, setEdit] = useState(false); // переключатель между режимом редактирования и просмотра
  const [like, setLike] = useState(false);   // для иконки лайка
  const [comment, setComment] = useState(false);   // для иконки лайка
  const [share, setShare] = useState(false);   // для иконки лайка
  const [value, setValue] = useState(() => window.location.href);

  // Состояние открытия диалога
  const [dialogOpen, setDialogOpen] = useState(false);

  // Обработчик клика по иконке "Поделиться"

  const {
    data: trainingData,
    isLoading,
    error
  } = useQuery<ITraining>(['trainingDetail', id], () => TrainingService.get(id!));

  const { data: planExercisesData } = useQuery(
    ['planExercises', id],
    () => PlanExerciseService.getAllPlan(trainingData?.id!.toString() ?? ""),
    { enabled: !!trainingData }
  );

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

  // Удаление плана
  const handleDelete = async () => {
    try {
      await TrainingService.delete(id!);
      queryClient.invalidateQueries('trainingPlans');
      navigate(-1);
    } catch (error) {
      console.error('Ошибка при удалении тренировочного плана:', error);
      alert('Не удалось удалить тренировочный план.');
    }
  };

  // Обработчики иконок
  const handleLikeClick = () => {
    setLike(!like);
  };

  const handleCommentClick = () => {
    setComment(!comment);
  };


  // Обработчик клика по иконке "Поделиться"
  const handleShareClick = () => {
    // Если хотите менять иконку при клике
    setShare(true);
    // Открываем диалог
    setDialogOpen(true);
  };


  // Закрытие диалога (передаётся в DialogShare)
  const handleCloseShareDialog = (newValue?: string) => {
    setDialogOpen(false);
    setShare(false);

    if (newValue) {
      setValue(newValue);
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
            sx={{ ml: 2 }}
            onClick={() => setEdit(!edit)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            sx={{ ml: 2, color: "red" }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Основной контент */}
      <Box sx={{ padding: '1rem', paddingBottom: '80px' /* чтобы не закрывал футер */ }}>
        {edit ? (
          <TrainingEdit trainingPlanId={Number(id)} onClickExit={() => {
            setEdit(!edit);
            queryClient.invalidateQueries(['trainingDetail', id]);
          }} />
        ) : (
          <div className="mr-5 mt-5 ml-5">
            <Chip className="mb-2" label={trainingData.statusPublish!.title} />
            <h1>{trainingData.title}</h1>
            <p>Вид спорта: {trainingData.sportType!.title}</p>
            <p>Описание: {trainingData.description}</p>
            <div className={`${styles.name} mb-5`}>Упражнения</div>
            <div>
              {planExercisesData && planExercisesData.length > 0 ? (
                planExercisesData.map((exercise, i) => (
                  <ExerciseCard key={exercise.id} exerciseId={exercise.exerciseId} index={i + 1} planExerciseId={exercise.id!} />
                ))
              ) : (
                <p>Упражнений пока нет.</p>
              )}
            </div>
            <p className={styles.date}>Опубликовано: {formattedDateCreated}</p>
            {comment ?
              <div>
                <h2>Комментарии: </h2>
              </div>
              : <></>
            }
          </div>
        )}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: `calc(100% - 340px)`,
          backgroundColor: '#fff',
          boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
        }}
      >
        <CardActions
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
            padding: '0.5rem'
          }}
        >
          <IconButton aria-label="like" onClick={handleLikeClick}>
            {like ? <ThumbUpOn sx={{
              color: ColorBackground
            }} /> : <ThumbUpOff />}
          </IconButton>

          <IconButton aria-label="comment" onClick={handleCommentClick}>
            {comment ? <BiSolidCommentDetail size={24} style={{
              color: ColorBackground
            }} /> : <BiCommentDetail size={24} />}
          </IconButton>

          <IconButton aria-label="share" onClick={handleShareClick}>
            {share ? <PiShareFatFill size={24} style={{
              color: ColorBackground
            }} /> : <PiShareFat size={24} />}
          </IconButton>
          <DialogShare
            keepMounted
            value={value}
            open={dialogOpen}
            onClose={handleCloseShareDialog}
          />
        </CardActions>
      </Box>
    </Box>
  );
}
