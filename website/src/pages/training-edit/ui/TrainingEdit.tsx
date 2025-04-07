import {
    Button,
    Card,
    IconButton,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TrainingService } from "../../../shared/api/training.service";
import { PlanExerciseService } from "../../../shared/api/planExercise.service";
import { ExerciseSetService } from "../../../shared/api/exerciseSet.service";
import { ExercisesService } from "../../../shared/api/exercises.service";
import styles from "./TrainingEdit.module.scss"
import { DialogCustom } from "../../training-new/ui/dialog";
import { IExercise } from "../../../shared/model/IExercise";
import { DialogSportType } from "../../training-new/ui/dialogTypeSport";
import { ISportType } from "../../../shared/model/ISportType";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ArrModel {
    titleExercise: string; countExercise: string, alignment: string, alignmentTime: string, alignmentDistance: string;
}

export default function TrainingEdit({ trainingPlanId, onClickExit }: { trainingPlanId: number, onClickExit: () => void }) {
    const [arr, setArr] = useState<ArrModel[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [valueSportType, setValueSportType] = useState<ISportType>({ id: 0, title: "", image: null });


    const [titleExercise, setTitleExercise] = useState('');
    const [countExercise, setCountExercise] = useState('');
    const [alignmentView, setAlignmentView] = useState('Nan');
    const [alignmentTime, setAlignmentTime] = useState('hour');
    const [alignmentDistance, setAlignmentDistance] = useState('km');

    const [open, setOpen] = useState(false);
    const [openSportType, setOpenSportType] = useState(false);
    const [value, setValue] = useState('Dione');
    const navigate = useNavigate(); // Вызываем хук здесь

    useEffect(() => {
        TrainingService.get(trainingPlanId.toString()).then((plan) => {
            setTitle(plan.title);
            setDescription(plan.description);
            setValueSportType(plan.sportType!);

            PlanExerciseService.getAllPlan(plan.id!.toString()).then((planExercises) => {
                const exercisesPromises = planExercises.map((exercise) =>
                    ExerciseSetService.getOnePlanExercises((exercise.id!)).then(async (sets) => {
                        const alignment = sets.duration
                            ? "time"
                            : sets.distance
                                ? "distance"
                                : sets.weight
                                    ? "weight"
                                    : "count";
                        const exerciseDetails = await ExercisesService.get(exercise.exerciseId.toString());
                        return {
                            titleExercise: exerciseDetails.name,
                            countExercise: (sets.repetitions || sets.weight || sets.distance || sets.duration)?.toString() || "",
                            alignment: alignment,
                            alignmentTime: sets.duration?.toString() || "",
                            alignmentDistance: sets.distance?.toString() || "",
                        };
                    })
                );

                Promise.all(exercisesPromises).then((exercises) => setArr(exercises));
            });
        });
    }, [trainingPlanId]);


    const handleClose = (newValue?: string) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };
    const handleClick = () => {
        setOpen(true);
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
        setArr([...arr, { titleExercise, countExercise, alignment: alignmentView, alignmentTime, alignmentDistance }]);
        setTitleExercise('');
        setCountExercise('');
        setAlignmentView('Nan');
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
    const handleSave = () => {
        updateTrainingPlan(trainingPlanId, title, description, arr, valueSportType, navigate, onClickExit); // Передаем navigate
    };

    return (
        <div className="mr-5 ml-5">
            <TextField variant="standard" margin="normal" autoFocus placeholder="Заголовок" sx={{ width: "100%" }} value={title} onChange={(e) => setTitle(e.target.value)}
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
            }} onClick={handleClickSportType}>Вид спорта: {valueSportType?.title}</Button>
            <DialogSportType keepMounted open={openSportType} onClose={handleCloseSportType} onSelectExercise={handleAddSelectedSportType} value={valueSportType!} />
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
                                    <ToggleButtonGroup size="small" value={exercise.alignmentTime} exclusive onChange={(_e, val) => handleExerciseChange(0, 'alignmentTime', val)}
                                        aria-label="stringType" sx={{ paddingLeft: "10px", height: "30px", }}>
                                        <ToggleButton value="hour">часы</ToggleButton>
                                        <ToggleButton value="minute">минуты</ToggleButton>
                                        <ToggleButton value="second">секунды</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                : exercise.alignment == 'distance' ?
                                    <div className="flex self-center pt-2">
                                        <ToggleButtonGroup size="small" value={exercise.alignmentDistance} exclusive onChange={(_e, val) => handleExerciseChange(0, 'alignmentDistance', val)}
                                            aria-label="stringType" sx={{ paddingLeft: "10px", height: "30px", }}>
                                            <ToggleButton value="km">километры</ToggleButton>
                                            <ToggleButton value="m">метры</ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                    : <></>
                        }
                        <div className="flex self-center p-2 pr-3 pl-3">
                            {exercise.alignment == 'distance' ? (
                                <> <TextField className="w-20 self-center" placeholder="0" variant="standard"
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
            <Button
                variant="contained"
                sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    color: "#FFFFFFFF",
                    background: "#4758d6",
                    borderRadius: "20px",
                    width: "100%",
                    fontWeight: "700",
                    padding: "8px 15px",
                }}
                onClick={handleSave}
            >
                Сохранить
            </Button>
        </div>
    );
}

// Функция updateTrainingPlan теперь принимает navigate как аргумент
async function updateTrainingPlan(
    id: number,
    title: string,
    description: string,
    arr: any[],
    valueSportType: ISportType,
    navigate: ReturnType<typeof useNavigate>, // Тип для navigate,
    onClickExit: () => void
) {
    try {
        const trainingPlan = await TrainingService.update(id, {
            title: title,
            description: description,
            userId: 1,
            statusTrainingId: 1,
            sportTypeId: valueSportType.id,
        });

        if (!trainingPlan.id) {
            throw new Error("Failed to create training plan");
        }

        // const plan = await TrainingService.getIdFirst();
        await PlanExerciseService.deleteAll(id.toString());

        for (const item of arr) {
            try {
                const exercise = await ExercisesService.getName(item.titleExercise);
                let exerciseId: number;

                if (!exercise || !exercise.id) {
                    const newExercise = await ExercisesService.create({
                        name: item.titleExercise,
                        description: "",
                        ExerciseCategoryId: 40,
                        isPrivate: true,
                    });
                    exerciseId = newExercise.id!;
                } else {
                    exerciseId = exercise.id;
                }

                const planExercise = await PlanExerciseService.create({
                    trainingPlanId: trainingPlan.id!,
                    setTotal: 0,
                    repTotal: 0,
                    exerciseStatus: 0,
                    exerciseId: exerciseId,
                });

                await ExerciseSetService.create({
                    planExerciseId: planExercise.id!,
                    duration:
                        item.alignment === "time"
                            ? item.alignmentTime === "hour"
                                ? BigInt(item.countExercise * 60 * 60)
                                : item.alignmentTime === "minute"
                                    ? BigInt(item.countExercise * 60)
                                    : BigInt(item.countExercise)
                            : undefined,
                    distance: item.alignment === "distance" ? parseInt(item.countExercise) : undefined,
                    weight:
                        item.alignment === "weight"
                            ? item.alignmentDistance === "km"
                                ? item.countExercise * 1000
                                : item.countExercise
                            : undefined,
                    repetitions: item.alignment === "count" ? parseInt(item.countExercise) : undefined,
                    calories_burned: undefined,
                    route_gpx: undefined,
                    stringType: item.alignment,
                    stringUnit:
                        item.alignment === "distance"
                            ? item.alignmentDistance === "km"
                                ? "км."
                                : "м."
                            : item.alignment === "time"
                                ? item.alignmentTime === "hour"
                                    ? "ч."
                                    : item.alignmentTime === "minute"
                                        ? "мин."
                                        : "сек."
                                : item.alignment === "weight" ?
                                    "кг."
                                    : "раз.",
                });

                console.log("Plan created:", trainingPlan);
                // navigate(`/training`); // Используем navigate здесь
                navigate(`/training/${id}`);
                onClickExit();

            } catch (exerciseError) {
                console.error(`Error processing exercise: ${item.titleExercise}`, exerciseError);
            }
        }
    } catch (error) {
        console.error("Error creating training plan:", error);
    }
}