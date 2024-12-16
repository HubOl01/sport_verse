import {
    Button,
    Card,
    IconButton,
    TextField,
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
//   import {
//     TrainingService,
//     ExercisesService,
//     ExerciseSetService,
//     PlanExerciseService,
//   } from "../../../shared/api"; // Путь к сервисам

interface ArrModel {
    titleExercise: string;
    countExercise: string;
    alignment: string;
}

export default function TrainingEdit({ trainingPlanId }: { trainingPlanId: number }) {
    const [arr, setArr] = useState<ArrModel[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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

    useEffect(() => {
        // Загрузка данных для редактирования
        TrainingService.get(trainingPlanId.toString()).then((plan) => {
            setTitle(plan.title);
            setDescription(plan.description);

            // Загрузка связанных упражнений
            PlanExerciseService.getAllPlan(plan.id!.toString()).then((planExercises) => {
                const exercisesPromises = planExercises.map((exercise) =>
                    ExerciseSetService.get(exercise.id!.toString()).then(async (sets) => {
                        const alignment = sets.duration
                            ? "time"
                            : sets.distance
                                ? "distance"
                                : sets.weight
                                    ? "weight"
                                    : "count";

                        const exerciseDetails = await ExercisesService.get(exercise.exerciseId.toString());
                        return {
                            titleExercise: exerciseDetails.name, // Название упражнения
                            countExercise: (sets.repetitions || sets.weight || sets.distance || sets.duration)?.toString() || "", // Приводим к string
                            alignment: alignment,
                        };
                    })
                );

                Promise.all(exercisesPromises).then((exercises) => setArr(exercises));
            });
        });
    }, [trainingPlanId]);

    const handleSave = async () => {
        // Обновление тренировочного плана
        const updatedPlan = await TrainingService.update(trainingPlanId, {
            title,
            description,
            userId: 1,
            statusTrainingId: 1,
            sportTypeId: 1,
        });

        // Удаление старых упражнений и их данных
        const oldPlanExercises = await PlanExerciseService.getAllPlan(trainingPlanId.toString());
        await Promise.all(oldPlanExercises.map((ex) => PlanExerciseService.delete(ex.id!.toString())));

        // Добавление новых упражнений
        for (const item of arr) {
            const exercise = await ExercisesService.getName(item.titleExercise).catch(() =>
                ExercisesService.create({
                    name: item.titleExercise,
                    description: "",
                    ExerciseCategoryId: 40,
                    isPrivate: true,
                })
            );

            const planExercise = await PlanExerciseService.create({
                trainingPlanId: updatedPlan.id!,
                setTotal: 0,
                repTotal: 0,
                exerciseStatus: 0,
                exerciseId: exercise.id!,
            });

            await ExerciseSetService.create({
                planExerciseId: planExercise.id!,
                duration: item.alignment === "time" ? BigInt(item.countExercise) : undefined,
                distance: item.alignment === "distance" ? parseInt(item.countExercise) : undefined,
                weight: item.alignment === "weight" ? parseInt(item.countExercise) : undefined,
                repetitions: item.alignment === "count" ? parseInt(item.countExercise) : undefined,
            });
        }
        alert("Тренировочный план успешно обновлен!");
    };

    const handleAddExercise = () => {
        setArr([...arr, { titleExercise: "", countExercise: "", alignment: "" }]);
    };

    return (
        <div className="mr-5 ml-5">
            <TextField
                variant="standard"
                margin="normal"
                placeholder="Заголовок"
                sx={{ width: "100%" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                slotProps={{
                    input: { style: { fontSize: "30px", fontWeight: 700 }, disableUnderline: true },
                }}
            />
            <TextField
                variant="standard"
                multiline
                margin="normal"
                placeholder="Описание"
                sx={{ width: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                slotProps={{ input: { style: { fontSize: "20px" }, disableUnderline: true } }}

            />

            <div className={`${styles.name} mb-5`}>Упражнения</div>
            {arr.map((exercise, index) => (
                <Card key={index} variant="outlined" sx={{ marginBottom: "20px", borderRadius: "20px" }}>
                    <div className="flex self-center p-2">
                        <TextField
                            placeholder="Название упражнения"
                            variant="standard"
                            value={exercise.titleExercise}
                            onChange={(e) => {
                                const updated = [...arr];
                                updated[index].titleExercise = e.target.value;
                                setArr(updated);
                            }}
                            sx={{ flex: 1 }}
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                    },
                                    disableUnderline: true,
                                }
                            }}
                        />
                        <IconButton onClick={() => setArr(arr.filter((_, i) => i !== index))}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Card>
            ))}

            {/* <Button variant="contained" onClick={handleAddExercise} sx={{ marginBottom: "10px" }}>
                Добавить упражнение
            </Button> */}
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
                marginBottom: "20px",
                color: "#FFFFFFFF",
                background: "#4758d6",
                borderRadius: "20px",
                width: "100%",
                fontWeight: "700",
                padding: "8px 15px"

            }}
                onClick={() => { handleSave }}>
                Сохранить изменения
            </Button>
        </div>
    );
}
