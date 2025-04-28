import { IPlanExercise } from "../../../shared/model/IPlanExercise";
import { Box, Typography } from "@mui/material";
import { ExerciseCard } from "./ExerciseCard";
import { getPluralForm } from "../../../shared/utils/getPluralForm";
import { capitalizeFirstLetter } from "../../../shared/utils/utils";

interface GroupedExercisesProps {
  planExercises: IPlanExercise[];
}

export function GroupedExercises({ planExercises }: GroupedExercisesProps) {
  let globalGroupIndex = 1;
  let globalExerciseIndex = 1;

  // Группируем только подряд идущие одинаковые упражнения
  const groups: IPlanExercise[][] = [];
  let currentGroup: IPlanExercise[] = [];

  for (const exercise of planExercises) {
    if (
      currentGroup.length > 0 &&
      currentGroup[currentGroup.length - 1].exerciseId !== exercise.exerciseId
    ) {
      groups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(exercise);
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return (
    <Box>
      {groups.map((group, groupIndex) => {
        const name = group[0]?.exercise?.name ?? "Без названия";

        // Собираем все подходы
        const allSets = group.flatMap((pe) => pe.ExerciseSet || []);
        const stringUnit = allSets[0]?.stringUnit ?? "";

        const values = allSets
          .map(set => {
            switch (set.stringType) {
              case "time": return set.stringUnit! === 'ч.' ? set.duration! / 60 / 60 : set.stringUnit === 'мин.' ? set.duration! / 60 : set.duration!;
              case "distance": return set.stringUnit! === 'км' ? set.distance! / 1000 : set.distance;
              case "weight": return set.weight;
              case "count":
              default: return set.repetitions;
            }
          })
          .filter((v): v is number => typeof v === "number");

        const min = Math.min(...values);
        const max = Math.max(...values);

        const repsText = values.length === 0
          ? "значения неизвестны"
          : min === max
            ? `${min} ${stringUnit}`
            : `${min}-${max} ${stringUnit}`;

        const setCount = group.length;
        const setsText = getPluralForm(setCount, ["подход", "подхода", "подходов"]);

        return (
          <Box key={groupIndex} sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {globalGroupIndex++}. {capitalizeFirstLetter(name)} — {setCount} {setsText} {repsText}
            </Typography>

            {group.map((pe) => (
              <ExerciseCard
                key={pe.id}
                planExercise={pe}
                index={globalExerciseIndex++}
              />
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
