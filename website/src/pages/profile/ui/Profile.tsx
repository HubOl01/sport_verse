import { Avatar } from '@mui/material'
import styles from './Profile.module.scss'

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
        <div className={`${styles.title_profile}`}>
          Jack
        </div>
      </div>
    </div >
  )
}
