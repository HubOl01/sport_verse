
export interface IExerciseSet{
    id?: number;
    planExerciseId: number;
    date?: Date;
    duration?: number;
    distance?: number;
    weight?: number;
    repetitions?: number;
    calories_burned?: number;
    route_gpx?: string;
    stringType?: string;
    stringUnit?: string;
}