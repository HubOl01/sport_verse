import { IPlanExercise } from "../../../shared/model/IPlanExercise";
import { Card, Typography, Box } from "@mui/material";

export function ExerciseCard({
    planExercise,
    index,
}: {
    planExercise: IPlanExercise;
    index: number;
}) {
    const name = planExercise.exercise?.name ?? "Без названия";
    const set = planExercise.ExerciseSet?.[0];

    const value = (() => {
        if (!set) return "—";

        switch (set.stringType) {
            case "time":
                return `${(set.stringUnit === "ч." ? (set.duration! / 60 / 60).toString() : set.stringUnit === "мин." ? (set.duration! / 60).toString() : (set.duration!).toString()) ?? "—"} ${set.stringUnit ?? ""}`;
            case "distance":
                return `${set.stringUnit === "км" ? (set.distance! / 1000).toString() : set.distance?.toString()
                    ?? "—"} ${set.stringUnit ?? ""}`;
            case "weight":
                return `${set.weight?.toString() ?? "—"} ${set.stringUnit ?? ""}`;
            case "count":
            default:
                return `${set.repetitions ?? "—"} ${set.stringUnit ?? ""}`;
        }
    })();

    return (
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
            <Box className="flex justify-between p-3">
                <Box className="flex">
                    <Typography fontSize={16} pr={1}>
                        {index}.
                    </Typography>
                    <Typography fontSize={16}>{name}</Typography>
                </Box>
                <Typography fontSize={16}>{value}</Typography>
            </Box>
        </Card>
    );
}
