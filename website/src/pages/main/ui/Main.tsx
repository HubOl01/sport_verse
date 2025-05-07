// import { newsList } from "../../../shared/data/listNews";
import { useQuery } from "react-query";
import CardEvent from "./cardEvent";
import CardMain from "./cardMain";
import styles from './Main.module.scss';
import { NewsService } from "../../../shared/api/news.service";
import CardNew from "./cardNew";
import { Masonry } from "@mui/lab";
import { ITrainingResult } from "../../../shared/model/ITrainingResult";
import { TrainingResultService } from "../../../shared/api/trainingResult.service";
import { useAuth } from "../../../shared/utils/useAuth";
import CardTraining from "../../training/ui/cardTraining";
import { useSmallScreen } from "../../../shared/utils/displaySizes";
import { CircularProgress, Typography } from "@mui/material";
export default function Main() {
  const { data } = useQuery(['news'], () => NewsService.getAll()
  )
  const isSmallScreen = useSmallScreen();
  const { user: USER } = useAuth();

  const { data: trainingResStartData, isLoading } = useQuery<ITrainingResult>(
    ['trainingStartResults', Number(USER.userId!)],
    () => TrainingResultService.getStartingUser(USER.userId!),
    { enabled: !!USER.userId }
  );

  return (
    <div className="flex justify-center items-center w-full" style={{ maxWidth: "1300px" }}>
      <div className={`flex flex-col items-center w-full mr-5 ml-5 mt-5`}>
        <div className={` ${isSmallScreen ? '' : 'flex justify-between'} w-full`}>
          <CardMain />
          <CardEvent />
        </div>
        {
          trainingResStartData && <div className="text-left w-full">
            <div className={styles.text_head}>
              Запущенная тренировка
            </div>
            <CardTraining key={trainingResStartData.trainingPlanId} training={trainingResStartData.trainingPlan!} grid isPrivateUser noMargin />
          </div>
        }


        <div>
          <div className={styles.text_head}>Новости</div>
          {isLoading ? (
            // Если данные загружаются
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
              <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                Загрузка...
              </Typography>
            </div>
          ) : Array.isArray(data) && data.length > 0 ? (
            // Если данные успешно загружены
            <Masonry
              columns={{ xs: 1, sm: 1, md: 2 }}
              spacing={{ xs: 2, sm: 2, md: 3 }}
              sx={{ width: "100%" }}
            >
              {data.map((item) => (
                <div key={item.id} className="w-full">
                  <CardNew newModel={item} grid={true} />
                </div>
              ))}
            </Masonry>
          ) : (
            // Если данных нет
            <Typography variant="body1" textAlign="center" sx={{ marginTop: "20px" }}>
              Нет новостей
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
