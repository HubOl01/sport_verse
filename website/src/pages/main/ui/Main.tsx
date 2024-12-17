import { newsList } from "../../../shared/data/listNews";
import CardEvent from "./cardEvent";
import CardMain from "./cardMain";
import CardNew from "./cardNew";
import styles from './Main.module.scss';
import Grid from '@mui/material/Grid2';
export default function Main() {
  return (
    <div className='mr-5 ml-5 mt-5'>
      <div className="flex ">
        <CardMain />
        <CardEvent />
      </div>
      <div className={styles.text_head}>Новости</div>
      <Grid container spacing={2}>
        {newsList.map((item, index) => (
          <Grid size={4}>
            <CardNew key={index} newModel={item} />
          </Grid>
        ))
        }
      </Grid>
    </div >
  )
}
