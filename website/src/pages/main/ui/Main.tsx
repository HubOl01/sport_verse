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
export default function Main() {
  const { data } = useQuery(['news'], () => NewsService.getAll()
  )
  const { user: USER } = useAuth();
  const { data: trainingResStartData } = useQuery<ITrainingResult>(
    ['trainingStartResults', Number(USER.userId!)],
    () => TrainingResultService.getStartingUser(USER.userId!),
    { enabled: !!USER.userId }
  );
  return (
    <div className="flex justify-center items-center w-full" style={{ maxWidth: "1300px", margin: "0 auto" }}>
      <div className="flex flex-col items-center w-full mr-5 ml-5 mt-5">
        <div className="flex justify-between w-full">
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
          <Masonry
            columns={{ xs: 1, sm: 1, md: 2 }}
            sx={{ width: '100%' }}
            spacing={{ xs: 2, sm: 2, md: 3 }}
          >
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="w-full">
                  <CardNew newModel={item} grid={true} />
                </div>
              ))
            ) : (
              <p>Нет новостей</p>
            )}
          </Masonry>
        </div>
      </div>
    </div>
  )
}
