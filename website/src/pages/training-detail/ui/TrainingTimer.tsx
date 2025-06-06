// import { useEffect, useState } from "react";
// import { Button, Divider, Stack, Typography } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import ru from "date-fns/locale/ru";
// import MyTextField from "../../../components/MyTextField";
// import styles from "./TrainingRead.module.scss";
// import Rating from "@mui/material/Rating";
// import { MySwitch } from "../../../components/MySwitch";
// import MyDateTimePicker from "../../../components/MyDateTimePicker";
// import { ColorBackground } from "../../../shared/styles/colors";

// interface TrainingTimerProps {
//   trainingPlay: boolean;
//   dateStartTraining: Date;
//   setDateStartTraining: (date: Date) => void;
//   isStartSportDateTraining: boolean;
//   setIsStartSportDateTraining: (isEnd: boolean) => void;
//   isEndSportDateTraining: boolean;
//   setIsEndSportDateTraining: (isEnd: boolean) => void;
//   dateEndTraining: Date;
//   setDateEndTraining: (date: Date) => void;
//   difficulty: number;
//   setDifficult: (value: number) => void;
//   commentTrainingRes: string;
//   isStartingUserPlanData: boolean;
//   setCommentTrainingRes: (comment: string) => void;
//   handleStartTraining: () => void;
//   handleEndTraining: () => void;
// }

// export default function TrainingTimer({
//   trainingPlay,
//   dateStartTraining,
//   setDateStartTraining,
//   isStartSportDateTraining,
//   isEndSportDateTraining,
//   setIsEndSportDateTraining,
//   dateEndTraining,
//   setDateEndTraining,
//   difficulty,
//   isStartingUserPlanData,
//   setDifficult,
//   commentTrainingRes,
//   setCommentTrainingRes,
//   handleStartTraining,
//   handleEndTraining,
// }: TrainingTimerProps) {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Вычисляем разницу между currentTime и dateStartTraining
//   const getFormattedTimeDifference = (): string => {
//     if (!(dateStartTraining instanceof Date)) {
//       return "00:00:00"; // Если дата начала тренировки не установлена
//     }

//     const diffMs = isEndSportDateTraining ? dateEndTraining.getTime() - dateStartTraining.getTime() : isStartSportDateTraining ? currentTime.getTime() - dateStartTraining.getTime() : currentTime.getTime() - currentTime.getTime();
//     if (diffMs < 0) return "00:00:00";

//     const hours = Math.floor(diffMs / (1000 * 60 * 60))
//       .toString()
//       .padStart(2, "0");
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
//       .toString()
//       .padStart(2, "0");
//     const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
//       .toString()
//       .padStart(2, "0");

//     return `${hours}:${minutes}:${seconds}`;
//   };

//   return (
//     <>
//       {trainingPlay && (
//         <>
//           <Divider sx={{ mb: "15px" }} />
//           <Typography variant="h4" fontWeight={600} textAlign={'center'} gutterBottom>
//             {getFormattedTimeDifference()}
//           </Typography>
//           <div className={`${styles.listTile}`}>
//             <div className={`${styles.title_about_title}`}>
//               Дата начала тренировки:
//             </div>
//             <div className={`${styles.title_about_content}`}>
//               <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
//                 <MyDateTimePicker
//                   label={"Укажите дату"}
//                   value={dateStartTraining instanceof Date ? dateStartTraining : new Date(dateStartTraining)}
//                   onChange={(newValue) => {
//                     setDateStartTraining(newValue!);
//                   }}
//                 />
//               </LocalizationProvider>
//             </div>
//           </div>

//           {/* <div className={`${styles.listTile}`}>
//             <div className={`${styles.title_about_title}`}>
//               Таймер тренировки:
//             </div>
//             <div className={`${styles.title_about_content}`}>

//             </div>
//           </div> */}

//           <div className={`${styles.listTile}`}>
//             <div className={`${styles.title_about_title}`}>
//               Закончили ли вы тренировку?:
//             </div>

//             <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
//               <Typography>Нет</Typography>
//               <MySwitch
//                 checked={isEndSportDateTraining}
//                 onChange={(ev) => {
//                   if (isStartingUserPlanData) {
//                     alert("Уже есть запущенная тренировка")
//                   } else {
//                     setIsEndSportDateTraining(ev.target.checked)
//                   }
//                 }

//                 }
//               />
//               <Typography>Да</Typography>
//             </Stack>
//             <div />
//           </div>
//           {isEndSportDateTraining && (
//             <div className={`${styles.listTile}`}>
//               <div className={`${styles.title_about_title}`}>
//                 Дата окончания тренировки:
//               </div>
//               <div className={`${styles.title_about_content}`}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
//                   <MyDateTimePicker
//                     label={"Укажите дату"}
//                     value={dateEndTraining instanceof Date ? dateEndTraining : new Date(dateEndTraining)}
//                     onChange={(newValue) => {
//                       setDateEndTraining(newValue!);
//                     }}
//                   />
//                 </LocalizationProvider>
//               </div>
//             </div>
//           )}
//           {isEndSportDateTraining && (
//             <div className={`${styles.listTile}`}>
//               <div className={`${styles.title_about_title}`}>Оцените сложность тренировки</div>
//               <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
//                 <Typography>Легко</Typography>
//                 <Rating
//                   value={difficulty}
//                   onChange={(_, newValue) => {
//                     setDifficult(newValue!);
//                     setDateEndTraining(currentTime);
//                   }}
//                   defaultValue={0}
//                   max={10}
//                 />
//                 <Typography>Тяжело</Typography>
//               </Stack>
//             </div>
//           )}
//           {isEndSportDateTraining && (
//             <MyTextField
//               label={"Комментарий к тренировке"}
//               onChange={(e) => setCommentTrainingRes(e.target.value)}
//               value={commentTrainingRes}
//               isBorder
//               isLines
//               styles={{
//                 marginTop: "15px",
//               }}
//             />
//           )}
//           <Button
//             variant="contained"
//             sx={{
//               marginTop: "20px",
//               marginBottom: "10px",
//               color: "#FFFFFFFF",
//               background: ColorBackground,
//               borderRadius: "20px",
//               width: "100%",
//               fontWeight: "600",
//               padding: "8px 15px",
//             }}
//             onClick={isEndSportDateTraining ? handleEndTraining : handleStartTraining}
//           >
//             {!isEndSportDateTraining ? "Начать тренировку" : "Закончить тренировку"}
//           </Button>
//           <Divider sx={{ mt: "15px", mb: "15px" }} />
//         </>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ru from "date-fns/locale/ru";
import MyTextField from "../../../components/MyTextField";
import styles from "./TrainingRead.module.scss";
import Rating from "@mui/material/Rating";
import { MySwitch } from "../../../components/MySwitch";
import MyDateTimePicker from "../../../components/MyDateTimePicker";
import { ColorBackground } from "../../../shared/styles/colors";

interface TrainingTimerProps {
  trainingPlay: boolean;
  dateStartTraining: Date;
  setDateStartTraining: (date: Date) => void;
  isStartSportDateTraining: boolean;
  setIsStartSportDateTraining: (isEnd: boolean) => void;
  isEndSportDateTraining: boolean;
  setIsEndSportDateTraining: (isEnd: boolean) => void;
  dateEndTraining: Date;
  setDateEndTraining: (date: Date) => void;
  difficulty: number;
  setDifficult: (value: number) => void;
  commentTrainingRes: string;
  isStartingUserPlanData: boolean;
  setCommentTrainingRes: (comment: string) => void;
  handleStartTraining: () => void;
  handleEndTraining: () => void;
}

export default function TrainingTimer({
  trainingPlay,
  dateStartTraining,
  setDateStartTraining,
  isStartSportDateTraining,
  isEndSportDateTraining,
  setIsEndSportDateTraining,
  dateEndTraining,
  setDateEndTraining,
  difficulty,
  isStartingUserPlanData,
  setDifficult,
  commentTrainingRes,
  setCommentTrainingRes,
  handleStartTraining,
  handleEndTraining,
}: TrainingTimerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStopTime, setIsStopTime] = useState(false);
  const [stopTime, setStopTime] = useState(new Date());
  // const [isTimerRunning, setIsTimerRunning] = useState(false); // Флаг для управления таймером

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Инициализируем как null

    // if (isStartSportDateTraining && !isEndSportDateTraining) {
    //   // Запускаем таймер, если тренировка начата и не завершена
    //   interval = setInterval(() => {
    //     setCurrentTime(new Date());
    //   }, 1000);
    //   setIsTimerRunning(true);
    // } else {
    //   // Останавливаем таймер, если тренировка завершена
    //   if (interval) {
    //     clearInterval(interval);
    //   }
    //   setIsTimerRunning(false);
    // }

    // Очищаем интервал при размонтировании компонента
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStartSportDateTraining, isEndSportDateTraining]);

  const getFormattedTimeDifference = (): string => {
    if (!(dateStartTraining instanceof Date)) {
      return "00:00:00";
    }

    const diffMs = isStopTime ? stopTime.getTime() - dateStartTraining.getTime() : isEndSportDateTraining
      ? dateEndTraining.getTime() - dateStartTraining.getTime()
      : isStartSportDateTraining
        ? currentTime.getTime() - dateStartTraining.getTime()
        : 0;

    if (diffMs < 0) return "00:00:00";

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      {trainingPlay && (
        <>
          <Divider sx={{ mb: "15px" }} />
          <Typography variant="h4" fontWeight={600} textAlign={"center"} gutterBottom>
            {getFormattedTimeDifference()}
          </Typography>
          <div className={`${styles.listTile}`}>
            <div className={`${styles.title_about_title}`}>
              Дата начала тренировки:
            </div>
            <div className={`${styles.title_about_content}`}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <MyDateTimePicker
                  label={"Укажите дату"}
                  value={dateStartTraining}
                  onChange={(newValue) => {
                    setDateStartTraining(newValue!);
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className={`${styles.listTile}`}>
            <div className={`${styles.title_about_title}`}>
              Закончили ли вы тренировку?:
            </div>

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Нет</Typography>
              <MySwitch
                checked={isEndSportDateTraining}
                onChange={(ev) => {
                  if (isStartingUserPlanData) {
                    alert("Уже есть запущенная тренировка");
                  } else {
                    setIsEndSportDateTraining(ev.target.checked);
                  }
                }}
              />
              <Typography>Да</Typography>
            </Stack>
          </div>

          {isEndSportDateTraining && (
            <div className={`${styles.listTile}`}>
              <div className={`${styles.title_about_title}`}>
                Дата окончания тренировки:
              </div>
              <div className={`${styles.title_about_content}`}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                  <MyDateTimePicker
                    label={"Укажите дату"}
                    value={dateEndTraining}
                    onChange={(newValue) => {
                      setDateEndTraining(newValue!);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )}

          {isEndSportDateTraining && (
            <div className={`${styles.listTile}`}>
              <div className={`${styles.title_about_title}`}>Оцените сложность тренировки</div>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography>Легко</Typography>
                <Rating
                  value={difficulty}
                  onChange={(_, newValue) => {
                    setDifficult(newValue!);
                    setIsEndSportDateTraining(true); // Завершаем тренировку
                    if (newValue! > 0) {
                      setStopTime(new Date());
                      setIsStopTime(true)
                    } else {
                      setIsStopTime(false)
                    }
                  }}
                  defaultValue={0}
                  max={10}
                />
                <Typography>Тяжело</Typography>
              </Stack>
            </div>
          )}

          {isEndSportDateTraining && (
            <MyTextField
              label={"Комментарий к тренировке"}
              onChange={(e) => setCommentTrainingRes(e.target.value)}
              value={commentTrainingRes}
              isBorder
              isLines
              styles={{
                marginTop: "15px",
              }}
            />
          )}

          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              color: "#FFFFFFFF",
              background: ColorBackground,
              borderRadius: "20px",
              width: "100%",
              fontWeight: "600",
              padding: "8px 15px",
            }}
            onClick={isEndSportDateTraining ? handleEndTraining : handleStartTraining}
          >
            {!isEndSportDateTraining ? "Начать тренировку" : "Закончить тренировку"}
          </Button>
          <Divider sx={{ mt: "15px", mb: "15px" }} />
        </>
      )}
    </>
  );
}