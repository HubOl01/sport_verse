import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./TrainingRead.module.scss";
import { ITraining } from '../../../shared/model/ITraining';
import { AppBar, Box, CardActions, Chip, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PlanExerciseService } from "../../../shared/api/planExercise.service";
import TrainingEdit from "../../training-edit/ui/TrainingEdit";
import { useEffect, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import { BiCommentDetail } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import ThumbUpOn from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOff from '@mui/icons-material/ThumbUpOffAlt';
import { ColorBackground } from "../../../shared/styles/colors";
import { DialogShare } from "./dialogShare";
import { ExerciseCard } from "./ExerciseCard";
import Comments from "./comments/Comments";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { LikeTrainingService } from "../../../shared/api/likeTraining.service";
import { ILikeModel } from "../../../shared/model/ILikeModel";

export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [edit, setEdit] = useState(false);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(true);
  const [share, setShare] = useState(false);
  const [value, setValue] = useState(() => window.location.href);

  const [dialogOpen, setDialogOpen] = useState(false);


  const { data: trainingData, isLoading, error } = useQuery<ITraining>(
    ['trainingDetail', id],
    () => TrainingService.get(id!),
    { enabled: !!id }
  );

  const { data: likeData } = useQuery<ILikeModel>(
    ['likeTraining', id, 1],
    () => LikeTrainingService.getPlanUser(id!, (1).toString()),
    { enabled: !!id }
  );
  const { data: likesCountData } = useQuery<number>(
    ['likeCountTraining', id, 1],
    () => LikeTrainingService.getCount(id!),
    { enabled: !!id }
  );
  useEffect(() => {
    if (likeData) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [likeData]);

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

  const handleLikeClick = async () => {
    try {
      if (like) {
        await LikeTrainingService.deletePlanUser(id!, (1).toString());
        setLike(false);
      } else {
        await LikeTrainingService.create({
          trainingPlanId: Number(id),
          userId: 1,
        });
        setLike(true);
      }
      queryClient.invalidateQueries('likeCountTraining');
    } catch (error) {
      console.error("Ошибка при обработке лайка:", error);
      alert("Не удалось выполнить действие. Попробуйте позже.");
    }
  };

  const handleCommentClick = () => {
    setComment(!comment);
  };


  const handleShareClick = () => {
    setShare(true);
    setDialogOpen(true);
  };


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
      <Box sx={{
        padding: '1rem', paddingBottom: '80px',

        maxHeight: "75vh",
        overflowY: "auto",



      }}>
        {edit ? (
          <TrainingEdit trainingPlanId={Number(id)} onClickExit={() => {
            setEdit(false);
            queryClient.invalidateQueries(['trainingDetail', id]);
            // window.location.reload();
          }} />
        ) : (
          <div className="mr-5 ml-5">
            {trainingData.isPrivate === 1 ?
              <LockOutlineIcon sx={{
                marginRight: '0.5rem',
                padding: '0px',
                margin: '0px',
              }} /> :
              <Chip label={trainingData.statusPublish!.title} />
            }
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
            {
              trainingData.isPrivate === 0 &&
                comment ?
                <div>
                  <h2>Комментарии: </h2>
                  <Comments idTraining={id!} />
                </div>
                : <></>
            }
          </div>
        )}
      </Box>
      {trainingData.isPrivate === 1 ? <></> :
        <Box
          className="w-full"
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            // maxWidth: `calc(100% - 300px)`,
            maxWidth: { xs: '100%', sm: 'calc(100% - 300px)' },
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
            <div className="flex items-center">
              <IconButton aria-label="like" onClick={handleLikeClick}>
                {like ? <ThumbUpOn sx={{
                  color: ColorBackground
                }} /> : <ThumbUpOff />}
              </IconButton>
              <Typography variant="body1" sx={{
                color: like ? ColorBackground : "#000",
                fontWeight: like ? 600 : 400,
              }}>
                {likesCountData}
              </Typography>
            </div>

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
      }
    </Box>
  );
}
