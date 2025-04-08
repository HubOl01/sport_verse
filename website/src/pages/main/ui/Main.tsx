// import { newsList } from "../../../shared/data/listNews";
import { useQuery } from "react-query";
import CardEvent from "./cardEvent";
import CardMain from "./cardMain";
import styles from './Main.module.scss';
import { NewsService } from "../../../shared/api/news.service";
import CardNew from "./cardNew";
import Grid from '@mui/material/Grid2';
export default function Main() {
  const { data, isLoading, error } = useQuery(['news'], () => NewsService.getAll()
  )
  return (
    <div className='mr-5 ml-5 mt-5'>
      <div className="flex ">
        <CardMain />
        <CardEvent />
      </div>
      <div className={styles.text_head}>Новости</div>
      <Grid container spacing={2}
      >
        {Array.isArray(data) && data.length > 0 ? (data!.map((item, index) => (
          <Grid size={6}>
            <CardNew key={index} newModel={item} grid={true} />
          </Grid>
        ))) : (
          <p>Нет новости</p>
        )
        }
      </Grid>
    </div >
  )
}
