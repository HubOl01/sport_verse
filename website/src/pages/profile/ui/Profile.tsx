import { Avatar, Card } from '@mui/material'
import styles from './Profile.module.scss'
import ListTile from './ListTile'

export default function Profile() {
  return (
    <div>
      <div className={`${styles.background}`}>
        <div className={styles.backgroundImg}>
          <Avatar sx={{
            height: 100,
            width: 100
          }} />
        </div>
        <div className={styles.backgroundText}>
          <div className='flex'>
            <div className={`${styles.title_profile}`}>
              Jack
            </div>
            <div className={`${styles.title_emoji}`}>
              😴
            </div>
          </div>
          <div className={`${styles.title_content}`}>
            Спортсмен
          </div>
        </div>
        <Card
          className="justify-center content-center self-center"
          variant="outlined"
          sx={{
            marginBottom: '20px',
            borderRadius: '20px',
            marginLeft: "20px",
            marginRight: "20px",
            marginBotton: "20px",
          }}
        >
          <div className="self-center p-2 pr-3 pl-3">
            <div className={`${styles.title_about}`}>
              О себе
            </div>
            <br />
            <ListTile title='Дата рождения:' content='1 января 1990' />
            <ListTile title='Вид спорта:' content='Легкая атлетика' />
            <ListTile title='Спортивный стаж:' content='15 лет' />
            <ListTile title='Спортивный разряд:' content='КМС' />

          </div>


        </Card>

      </div>
    </div >
  )
}
