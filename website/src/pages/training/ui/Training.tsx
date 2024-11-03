import { useQuery } from "react-query";
import CardTraining from "./cardTraining";
import { ITraining } from '../../../shared/model/ITraining';
import { TrainingService } from "../../../shared/api/training.service";

export default function Training() {
  const { data, isLoading, error } = useQuery(['training'], () => TrainingService.getAll()
  )

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Произошла ошибка при загрузке данных.</p>;
  console.log(data, error)
  return (
    <div>
      {/* {data ? data.map((plan: ITraining) => (
        <CardTraining key={plan.id} training={plan} />
        // <CompanyCard key={company.id} company={company} />
      ))
        : <p>Нет планов</p>
      } */}
      {Array.isArray(data) && data.length > 0 ? (
        data.map((plan: ITraining) => (
          <CardTraining key={plan.id} training={plan} />
        ))
      ) : (
        <p>Нет планов</p>
      )}
    </div>
  )
}
