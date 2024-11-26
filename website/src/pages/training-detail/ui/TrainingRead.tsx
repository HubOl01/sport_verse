import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./TrainingRead.module.scss";
import { ITraining } from '../../../shared/model/ITraining';
import { AppBar, Box, Card, Chip, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PlanExerciseService } from "../../../shared/api/planExercise.service";
import { ExercisesService } from "../../../shared/api/exercises.service";
import DeleteIcon from '@mui/icons-material/Delete';

export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: trainingData, isLoading, error } = useQuery<ITraining>(
    ['trainingDetail', id],
    () => TrainingService.get(id!)
  );

  const { data: planExercisesData, isLoading: isPlanExercisesLoading, error: planExercisesError } = useQuery(
    ['planExercises', id],
    () => PlanExerciseService.getAllPlan(trainingData?.id!.toString() ?? ""),
    { enabled: !!trainingData }
  );

  if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  if (!trainingData) return <p className={styles.text}>Нет плана</p>;

  const formattedDateCreated = new Date(trainingData.date_created!).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton
              // size="large"
              edge="end"
              // aria-label="menu"
              sx={{ ml: 2, color: "red" }}
              onClick={() => {
                
                navigate(-1);
                }}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="mr-5 mt-5 ml-5">
        <Chip className="mb-2" label={trainingData.statusPublish!.title} />
        <h1>{trainingData.title}</h1>
        <p>Вид спорта: {trainingData.sportType!.title}</p>
        <p>Описание: {trainingData.description}</p>
        <div className={`${styles.name} mb-5`}>Упражнения</div>
        <div>
          {planExercisesData && planExercisesData.length > 0 ? (
            planExercisesData.map((exercise, i) => (
              <ExerciseCard key={exercise.id} exerciseId={exercise.exerciseId} index={i + 1} />
            ))
          ) : (
            <p>Упражнений пока нет.</p>
          )}
        </div>
        <p className={styles.date}>Опубликовано: {formattedDateCreated}</p>
      </div>
    </>
  );
}


function ExerciseCard({ exerciseId, index }: { exerciseId: number; index: number }) {
  const { data: exerciseData, isLoading, error } = useQuery(
    ['exercise', exerciseId],
    () => ExercisesService.get(exerciseId.toString())
  );

  // if (isLoading) return <Card variant="outlined" sx={{ marginBottom: '20px', borderRadius: '20px' }}>Загрузка...</Card>;
  // if (error) return <Card variant="outlined" sx={{ marginBottom: '20px', borderRadius: '20px' }}>Ошибка загрузки.</Card>;

  return (
    <Card
      className="justify-center content-center self-center"
      variant="outlined"
      sx={{
        marginBottom: '20px',
        borderRadius: '20px',
      }}
    >
      <div className="flex self-center p-2 pr-3 pl-3">
        <div style={{ fontSize: "16px", alignSelf: 'center', paddingRight: "10px" }}>{index}. </div>
        <div style={{ fontSize: "16px" }}>
          {exerciseData?.name}
        </div>
      </div>
    </Card>
  );
}
