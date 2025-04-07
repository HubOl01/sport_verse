import { useQuery } from "react-query";
import { ExercisesService } from "../../../shared/api/exercises.service";
import { ExerciseSetService } from "../../../shared/api/exerciseSet.service";
import { Card } from "@mui/material";

export function ExerciseCard({ exerciseId, index, planExerciseId }: { exerciseId: number; index: number; planExerciseId: number }) {
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
                    {
                        exerciseSetData?.stringType === "time" ?
                            exerciseSetData?.duration?.toString()
                            : exerciseSetData?.stringType === "distance" ?
                                exerciseSetData?.distance?.toString() :
                                exerciseSetData?.stringType === "weight" ?
                                    exerciseSetData?.weight?.toString() :
                                    exerciseSetData?.repetitions?.toString()
                                    + " " + exerciseSetData?.stringUnit
                    }
                </div>
            </div>

        </Card>
    );
}