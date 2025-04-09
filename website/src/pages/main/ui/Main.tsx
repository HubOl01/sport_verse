// import { newsList } from "../../../shared/data/listNews";
import { useQuery } from "react-query";
import CardEvent from "./cardEvent";
import CardMain from "./cardMain";
import styles from './Main.module.scss';
import { NewsService } from "../../../shared/api/news.service";
import CardNew from "./cardNew";
import { Masonry } from "@mui/lab";
export default function Main() {
  const { data } = useQuery(['news'], () => NewsService.getAll()
  )
  return (
    <div
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div className='mr-5 ml-5 mt-5'>
        <div className="flex ">
          <CardMain />
          <CardEvent />
        </div>
        <div className={styles.text_head}>Новости</div>
        <Masonry
          columns={{ xs: 1, sm: 1, md: 2 }}
          sx={{ width: '100%' }}
          spacing={{ xs: 2, sm: 2, md: 3 }}
        >
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} >
                <CardNew newModel={item} grid={true} />
              </div>
            ))
          ) : (
            <p>Нет новостей</p>
          )}
        </Masonry>
      </div >
    </div>

  )
}
