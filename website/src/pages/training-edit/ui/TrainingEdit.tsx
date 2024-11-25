import { Button, Card, IconButton, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./TrainingEdit.module.scss"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DialogCustom } from "./dialog";
import { IExercise } from "../../../shared/model/IExercise";
import { TrainingService } from "../../../shared/api/training.service";
import { ExercisesService } from "../../../shared/api/exercises.service";
import { ExerciseSetService } from "../../../shared/api/exerciseSet.service";
import { PlanExerciseService } from "../../../shared/api/planExercise.service";


interface ArrModel {
  titleExercise: string; countExercise: string, alignment: string
}
export default function TrainingEdit() {
  const [arr, setArr] = useState<ArrModel[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleExercise, setTitleExercise] = useState('');
  const [countExercise, setCountExercise] = useState('');
  const [alignment, setAlignment] = useState('Nan');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const handleAddSelectedExercise = (exercise: IExercise) => {
    setArr([...arr, { titleExercise: exercise.name, countExercise: '', alignment: 'Nan' }]);
  };

  const handleAddExercise = () => {
    setArr([...arr, { titleExercise, countExercise, alignment }]);
    setTitleExercise('');
    setCountExercise('');
    setAlignment('');
  };

  const handleExerciseChange = (index: number, field: 'titleExercise' | 'countExercise' | 'alignment', value: string) => {
    const newArr = [...arr];
    newArr[index][field] = value;
    setArr(newArr);
  };

  const handleDeleteExercise = (index: number) => {
    const newArr = arr.filter((_, i) => i !== index);
    setArr(newArr);
  };

  const handleCopyExercise = (index: number) => {
    const copiedExercise = { ...arr[index] }; // Копируем выбранное упражнение
    setArr([...arr, copiedExercise]); // Добавляем его в конец массива
  };

  return (
    <div className='mr-5 ml-5'><TextField
      variant="standard"
      margin="normal"
      autoFocus
      // onChange={handlePhoneNumberChange}
      placeholder="Заголовок"

      sx={{
        width: "100%"
      }}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      slotProps={{
        input: {
          style: {
            fontSize: "30px",
            fontWeight: 700
          },
          disableUnderline: true,
        }
      }}
    />
      <br />
      <TextField
        variant="standard"
        multiline
        margin="normal"
        autoFocus
        sx={{
          width: "100%"
        }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        slotProps={{
          input: {
            style: {
              fontSize: "20px",
            },
            disableUnderline: true,
          },
        }}
      />
      <br />
      <div className={`${styles.name} mb-5`}>Упражения</div>
      {arr.map((exercise, index) => (
        <Card
          className="justify-center content-center self-center"
          key={index} variant="outlined" sx={{
            marginBottom: '20px',
            borderRadius: '20px',
          }}>
          <div className="flex self-center p-2 pr-3 pl-3">
            <div style={{ fontSize: "16px", alignSelf: 'center', paddingRight: "10px" }}>{index + 1}. </div>
            <TextField
              className="w-full self-center"
              placeholder="Название упражнения"
              variant="standard"

              value={exercise.titleExercise}
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
            <IconButton
              className="w-10 h-10 self-center"
              sx={{ color: "" }}
              onClick={() => handleCopyExercise(index)}

            >
              <ContentCopyIcon />
            </IconButton>
            <IconButton
              className="w-10 h-10 self-center"
              sx={{ color: "red" }}
              onClick={() => handleDeleteExercise(index)}

            >
              <DeleteIcon />
            </IconButton>
          </div>

          <>
            <ToggleButtonGroup
              size="small"
              value={exercise.alignment}
              exclusive
              onChange={(_e, val) => handleExerciseChange(index, 'alignment', val)}
              aria-label="stringType"
              sx={{
                paddingLeft: "10px",
                height: "30px",
              }}
            >
              <ToggleButton value="Nan">Ничего</ToggleButton>
              <ToggleButton value="distance">Дистанция</ToggleButton>
              <ToggleButton value="weight">Вес</ToggleButton>
              <ToggleButton value="time">Время</ToggleButton>
              <ToggleButton value="count">Количество</ToggleButton>
            </ToggleButtonGroup>
            <div className="flex self-center p-2 pr-3 pl-3">

              {exercise.alignment == 'distance' ? (<> <TextField
                className="w-20 self-center"
                placeholder="0"
                variant="standard"
                value={exercise.countExercise}
                onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                slotProps={{
                  input: {
                    style: {
                      fontSize: "16px",
                    },
                    disableUnderline: true,
                  }
                }}
              /><div className="self-center">км.</div></>) : exercise.alignment == 'weight' ? (<><TextField
                className="w-20 self-center"
                placeholder="0"
                variant="standard"
                value={exercise.countExercise}
                onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                slotProps={{
                  input: {
                    style: {
                      fontSize: "16px",
                    },
                    disableUnderline: true,
                  }
                }}
              /><div className="self-center">кг.</div></>) : exercise.alignment == 'time' ? (<><TextField
                className="w-20 self-center"
                placeholder="0"
                variant="standard"
                value={exercise.countExercise}
                onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
                slotProps={{
                  input: {
                    style: {
                      fontSize: "16px",
                    },
                    disableUnderline: true,
                  }
                }}
              /><div className="self-center">сек</div></>) : exercise.alignment == 'count' ? (<><TextField
                className="w-20 self-center"
                placeholder="0"
                variant="standard"
                value={exercise.countExercise}
                onChange={(e) => handleExerciseChange(index, 'countExercise', e.target.value)}
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
        <Button variant="contained" sx={{
          color: "#FFFFFF",
          backgroundColor: "rgba(0,0,0,.5)",
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
        <DialogCustom
          keepMounted
          open={open}
          onClose={handleClose}
          onSelectExercise={handleAddSelectedExercise}
          value={value}
        />

      </div>
      <Button variant="contained" sx={{
        marginTop: "20px",
        color: "#FFFFFFFF",
        background: "#4758d6",
        borderRadius: "20px",
        width: "100%",
        fontWeight: "700",
        padding: "8px 15px"
      }}
        onClick={() => {

          TrainingService.create({
            title: title,
            description: description,
            userId: 1,
            statusTrainingId: 1,
            sportTypeId: 1,
          });
          TrainingService.getIdFirst().then(plan => {

            arr.forEach(item => {


              ExercisesService.getName(item.titleExercise).then(exercise => {
                if (exercise.id === undefined) {
                  // console.log('error');
                  ExercisesService.create({
                    name: item.titleExercise,
                    description: "",
                    ExerciseCategoryId: 40,
                    isPrivate: false
                  })
                } else {
                  console.log(exercise.id);

                  PlanExerciseService.create({
                    trainingPlanId: plan.id!,
                    setTotal: 0,
                    repTotal: 0,
                    exerciseStatus: 0,
                    exerciseId: exercise.id!,
                  });
                  PlanExerciseService.getIdFirst().then(planExercise => {
                    ExerciseSetService.create(
                      {
                        planExerciseId: planExercise.id!,
                        duration: item.alignment == 'time' ? BigInt(parseInt(item.countExercise)) : undefined,
                        distance: item.alignment == 'distance' ? parseInt(item.countExercise) : undefined,
                        weight: item.alignment == 'weight' ? parseInt(item.countExercise) : undefined,
                        repetitions: item.alignment == 'count' ? parseInt(item.countExercise) : undefined,
                        calories_burned: undefined,
                        route_gpx: undefined,
                        stringType: "",
                      }
                    );
                  })
                }
              })
            });
          });


        }
        }
      >Сохранить</Button>
    </div >
  )
}
