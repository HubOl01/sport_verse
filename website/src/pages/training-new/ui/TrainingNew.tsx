import { Button, Card, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import styles from "./TrainingNew.module.scss"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DialogCustom } from "./dialog";
import { IExercise } from "../../../shared/model/IExercise";
import { TrainingService } from "../../../shared/api/training.service";
import { ExercisesService } from "../../../shared/api/exercises.service";
import { ExerciseSetService } from "../../../shared/api/exerciseSet.service";
import { PlanExerciseService } from "../../../shared/api/planExercise.service";
import { DialogSportType } from "./dialogTypeSport";
import { ISportType } from '../../../shared/model/ISportType';
import { NavigateFunction, useNavigate } from "react-router-dom";
import MyButton from "../../../components/MyButton";
import { useAuth } from "../../../shared/utils/useAuth";


interface ArrModel {
  titleExercise: string; countExercise: string, alignment: string, alignmentTime: string, alignmentDistance: string;
}
// interface SportTypeModel {

//   title: string; 
// }
export default function TrainingEdit() {
  const [arr, setArr] = useState<ArrModel[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleExercise, setTitleExercise] = useState('');
  const [countExercise, setCountExercise] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [alignmentView, setAlignmentView] = useState('Nan');
  const [alignmentTime, setAlignmentTime] = useState('hour');
  const [alignmentDistance, setAlignmentDistance] = useState('km');

  const [open, setOpen] = useState(false);
  const [openSportType, setOpenSportType] = useState(false);
  const [value, setValue] = useState('Dione');
  const [valueSportType, setValueSportType] = useState<ISportType>({ id: 0, title: 'Выберите вид спорта', image: null });
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };
  const { user: USER } = useAuth();

  if (!USER?.token) {
    navigate("/login");
    return null;
  }


  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const handleClickSportType = () => {
    setOpenSportType(true);
  };


  const handleCloseSportType = (newValue?: string) => {
    setOpenSportType(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const handleAddSelectedExercise = (exercise: IExercise) => {
    setArr([...arr, { titleExercise: exercise.name, countExercise: '', alignment: 'alignment', alignmentTime: 'alignmentTime', alignmentDistance: 'alignmentDistance' }]);
  };
  const handleAddSelectedSportType = (sportType: ISportType) => {
    setValueSportType(sportType);
  };

  const handleAddExercise = () => {
    setArr([...arr, { titleExercise, countExercise, alignment: alignmentView, alignmentTime: alignmentTime, alignmentDistance: alignmentDistance }]);
    setTitleExercise('');
    setCountExercise('');
    setAlignmentView('Nan');
    setAlignmentTime('hour');
    setAlignmentDistance('km');
  };

  const handleExerciseChange = (index: number, field: 'titleExercise' | 'countExercise' | 'alignment' | 'alignmentTime' | 'alignmentDistance', value: string) => {
    const newArr = [...arr];
    newArr[index][field] = value;
    setArr(newArr);
  };

  const handleDeleteExercise = (index: number) => {
    const newArr = arr.filter((_, i) => i !== index);
    setArr(newArr);
  };

  const handleCopyExercise = (index: number) => {
    const copiedExercise = { ...arr[index] };
    setArr([...arr, copiedExercise]);
  };

  return (
    <div>
      <div className='mr-5 ml-5'><TextField variant="standard" margin="normal" autoFocus placeholder="Заголовок" sx={{ width: "100%" }} value={title} onChange={(e) => setTitle(e.target.value)}
        slotProps={{
          input: {
            style: {
              fontSize: "30px",
              fontWeight: 700
            },
            disableUnderline: true,
          }
        }} />
        <br />
        <TextField variant="standard" multiline margin="normal" autoFocus sx={{ width: "100%" }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание"
          slotProps={{
            input: {
              style: {
                fontSize: "20px",
              },
              disableUnderline: true,
            },
          }} />
        <br />
        <Button sx={{
          color: "black",
          // borderRadius: "30px",
          justifyContent: "start",
          textTransform: 'none',
          width: "100%",
          fontSize: "18px",
          padding: "5px 8px 5px 0px",
        }} onClick={handleClickSportType}>

          <Typography variant="subtitle1" marginRight={"6px"}>
            Вид спорта:
          </Typography>
          {valueSportType.id === 0 ? <Typography variant="subtitle1" color="textSecondary">{' ' + valueSportType?.title}</Typography> : <Typography variant="subtitle1">{valueSportType?.title}</Typography>}
        </Button>
        <DialogSportType keepMounted open={openSportType} onClose={handleCloseSportType} onSelectSportType={handleAddSelectedSportType} value={valueSportType!} />
        <div className={`${styles.name} mb-5`}>Упражения</div>
        {arr.map((exercise, index) => (
          <Card className="justify-center content-center self-center" key={index} variant="outlined" sx={{ marginBottom: '20px', borderRadius: '20px', }}>
            <div className="flex self-center p-2 pr-3 pl-3">
              <div style={{ fontSize: "16px", alignSelf: 'center', paddingRight: "10px" }}>{index + 1}. </div>
              <TextField className="w-full self-center" placeholder="Название упражнения" variant="standard" value={exercise.titleExercise}
                onChange={(e) => handleExerciseChange(index, 'titleExercise', e.target.value)}
                slotProps={{
                  input: {
                    style: {
                      fontSize: "16px",
                    },
                    disableUnderline: true,
                  }
                }}
              />
              <IconButton className="w-10 h-10 self-center" sx={{ color: "" }} onClick={() => handleCopyExercise(index)}>
                <ContentCopyIcon />
              </IconButton>
              <IconButton className="w-10 h-10 self-center" sx={{ color: "red" }} onClick={() => handleDeleteExercise(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
            <>
              <ToggleButtonGroup size="small" value={exercise.alignment} exclusive onChange={(_e, val) => handleExerciseChange(index, 'alignment', val)}
                aria-label="stringType" sx={{ paddingLeft: "10px", height: "30px", }}>
                <ToggleButton value="Nan">Ничего</ToggleButton>
                <ToggleButton value="distance">Дистанция</ToggleButton>
                <ToggleButton value="weight">Вес</ToggleButton>
                <ToggleButton value="time">Время</ToggleButton>
                <ToggleButton value="count">Количество</ToggleButton>
              </ToggleButtonGroup>
              {
                exercise.alignment == 'time' ?
                  <div className="flex self-center pt-2">
                    <ToggleButtonGroup size="small" value={exercise.alignmentTime} exclusive onChange={(_e, val) => handleExerciseChange(index, 'alignmentTime', val)}
                      aria-label="stringType" sx={{ paddingLeft: "10px", height: "30px", }}>
                      <ToggleButton value="hour">часы</ToggleButton>
                      <ToggleButton value="minute">минуты</ToggleButton>
                      <ToggleButton value="second">секунды</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  : exercise.alignment == 'distance' ?
                    <div className="flex self-center pt-2">
                      <ToggleButtonGroup size="small" value={exercise.alignmentDistance} exclusive onChange={(_e, val) => handleExerciseChange(index, 'alignmentDistance', val)}
                        aria-label="stringType" sx={{ paddingLeft: "10px", height: "30px", }}>
                        <ToggleButton value="km">километры</ToggleButton>
                        <ToggleButton value="m">метры</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    : <></>
              }
              <div className="flex self-center p-2 pr-3 pl-3">
                {exercise.alignment == 'distance' ? (<> <TextField className="w-20 self-center" placeholder="0" variant="standard"
                  value={exercise.countExercise} onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                  slotProps={{
                    input: {
                      style: {
                        fontSize: "16px",
                      },
                      disableUnderline: true,
                    }
                  }}
                /><div className="self-center">
                    {
                      exercise.alignmentDistance == 'km' ? 'км' : 'м'
                    }
                  </div></>) : exercise.alignment == 'weight' ? (<><TextField className="w-20 self-center"
                    placeholder="0" variant="standard" value={exercise.countExercise} onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                    slotProps={{
                      input: {
                        style: {
                          fontSize: "16px",
                        },
                        disableUnderline: true,
                      }
                    }}
                  /><div className="self-center">кг.</div></>) : exercise.alignment == 'time' ? (<><TextField className="w-20 self-center"
                    placeholder="0" variant="standard" value={exercise.countExercise} onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                    slotProps={{
                      input: {
                        style: {
                          fontSize: "16px",
                        },
                        disableUnderline: true,
                      }
                    }}
                  /><div className="self-center">
                      {
                        exercise.alignmentTime == 'hour' ? 'ч.' : exercise.alignmentTime == 'minute' ? 'мин.' : 'сек.'
                      }
                    </div></>) : exercise.alignment == 'count' ? (<><TextField className="w-20 self-center" placeholder="0" variant="standard"
                      value={exercise.countExercise} onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                      slotProps={{
                        input: {
                          style: {
                            fontSize: "16px",
                          },
                          disableUnderline: true,
                        }
                      }}
                    /><div className="self-center">раз.</div></>) : (<></>)}

              </div>

            </>

          </Card>
        ))}

        <div className="flex gap-2">
          <Button variant="contained"
            sx={{
              color: "#FFFFFF",
              backgroundColor: "rgba(0, 0, 0, 0.298)",
              borderRadius: "20px",
              width: "100%",
              padding: "8px 15px",

            }} onClick={handleAddExercise}>Добавить упражение</Button>
          <Button variant="contained" sx={{
            color: "#FFFFFF",
            backgroundColor: "rgba(61, 78, 206, 1)",
            borderRadius: "20px",
            width: "300px",
            padding: "8px 15px",
          }} onClick={handleClick} >Добавить из базы</Button>
          <DialogCustom keepMounted open={open} onClose={handleClose} onSelectExercise={handleAddSelectedExercise} value={value} />
        </div>
        <div className="flex mt-10 mb-5 items-center">
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Статус публикации: {isPrivate ? "Приватная" : "Публичная"}
          </Typography>
          <MyButton onClick={() => setIsPrivate(!isPrivate)} label={`Сделать ${isPrivate ? "публичной" : "приватной"}`} style={{
            textTransform: "none",
            fontWeight: 500
          }} />
        </div>
        <Button variant="contained" sx={{
          marginBottom: "20px",
          color: "#FFFFFFFF",
          background: "#4758d6",
          borderRadius: "20px",
          width: "100%",
          fontWeight: "700",
          padding: "8px 15px"
        }}
          onClick={
            () => {
              if (title === '' && description === '' && arr.length === 0 && valueSportType.id === 0) {
                alert('Заполните все поля');
              } else {
                createTrainingPlan(title, description, isPrivate, arr, Number(USER.userId), valueSportType, navigate);
              }
            }
          }
        >Сохранить</Button>
      </div >
    </div>
  )
}

async function createTrainingPlan(
  title: string,
  description: string,
  isPrivate: boolean,
  arr: any[],
  userId: number,
  valueSportType: ISportType,
  navigate: NavigateFunction) {

  try {
    // Создаем тренировочный план
    const trainingPlan = await TrainingService.create({
      title: title,
      description: description,
      userId: userId,
      statusTrainingId: 1,
      isPrivate: isPrivate ? 1 : 0,
      sportTypeId: valueSportType.id,
    });

    if (!trainingPlan.id) {
      throw new Error("Failed to create training plan");
    }

    // Получаем созданный тренировочный план
    const plan = await TrainingService.getIdFirst();

    // Итерация по каждому элементу массива
    for (const item of arr) {
      try {
        // Пытаемся получить упражнение по названию
        const exercise = await ExercisesService.getName(item.titleExercise);

        let exerciseId: number;

        // Если упражнения нет, создаем его
        if (!exercise || !exercise.id) {
          const newExercise = await ExercisesService.create({
            name: item.titleExercise,
            description: "",
            ExerciseCategoryId: 40,
            userId: isPrivate ? userId : undefined,
            isPrivate: isPrivate,
          });
          exerciseId = newExercise.id!;
        } else {
          exerciseId = exercise.id;
        }

        // Создаем связь с планом упражнений
        const planExercise = await PlanExerciseService.create({
          trainingPlanId: plan.id!,
          setTotal: 0,
          repTotal: 0,
          exerciseStatus: 0,
          exerciseId: exerciseId,
        });

        // Создаем набор упражнений
        await ExerciseSetService.create({
          planExerciseId: planExercise.id!,
          duration: item.alignment === "time"
            ? item.alignmentTime === 'hour'
              ? (parseInt(item.countExercise) * 60 * 60)
              : item.alignmentTime === 'minute'
                ? (parseInt(item.countExercise) * 60)
                : parseInt(item.countExercise)
            : undefined,

            distance: item.alignment === "distance" ?
            item.alignmentDistance === 'km' ?
                parseFloat(item.countExercise) * 1000 :
                parseFloat(item.countExercise) : undefined,
          weight: item.alignment === "weight" ?
            item.countExercise
            : undefined,
          repetitions: item.alignment === "count" ? parseInt(item.countExercise) : undefined,
          calories_burned: undefined,
          route_gpx: undefined,
          stringType: item.alignment,
          stringUnit: item.alignment === 'distance' ?
            item.alignmentDistance === 'km' ? 'км' : 'м' : item.alignment === 'time' ?
              item.alignmentTime === 'hour' ? 'ч.' : item.alignmentTime === 'minute' ? 'мин.' : 'сек.' :
              item.alignment === "weight" ?
                "кг." :
                'раз.',
        });
        console.log("Plan created:", plan);
        navigate('/training');
      } catch (exerciseError) {
        console.error(`Error processing exercise: ${item.titleExercise}`, exerciseError);
      }
    }
  } catch (error) {
    console.error("Error creating training plan:", error);
  }
}