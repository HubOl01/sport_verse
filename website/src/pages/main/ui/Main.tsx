// import { newsList } from "../../../shared/data/listNews";
import CardEvent from "./cardEvent";
import CardMain from "./cardMain";
import styles from './Main.module.scss';
export default function Main() {
  return (
    <div className='mr-5 ml-5 mt-5'>
      <div className="flex ">
        <CardMain />
        <CardEvent />
      </div>
      <div className={styles.text_head}>Новости</div>
      {/* <Grid container spacing={2}>
        {newsList.map((item, index) => (
          <Grid size={4}>
            <CardNew key={index} newModel={item} />
          </Grid>
        ))
        }
      </Grid> */}
    </div >
  )
}
