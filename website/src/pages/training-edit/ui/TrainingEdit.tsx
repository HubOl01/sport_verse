import { Button, TextField } from "@mui/material";
import styles from "./TrainingEdit.module.scss"

export default function TrainingEdit() {
  return (
    <div className='mr-5 ml-5'><TextField
      variant="standard"
      margin="normal"
      autoFocus
      // onChange={handlePhoneNumberChange}
      placeholder="Заголовок"
      sx={{
        width: "100%"
      }}
      slotProps={{
        input: {
          style: {
            fontSize: "30px",
            fontWeight: 700
          },
          disableUnderline: true,
        }
      }}
    />
      <br />
      <TextField
        variant="standard"
        multiline
        margin="normal"
        autoFocus
        sx={{
          width: "100%"
        }}
        // onChange={handlePhoneNumberChange}
        placeholder="Описание"
        slotProps={{
          input: {
            style: {
              fontSize: "20px",

              // fontWeight: 700
            },
            disableUnderline: true,

          },

        }}
      />
      <br />
      <div className={`${styles.name} mb-5`}>Упражения</div>
      <Button variant="contained" sx={{
        color: "#FFFFFF",
        backgroundColor: "rgba(0,0,0,.5)",
        borderRadius: "20px",
        width: "100%",
        padding: "8px 15px"
      }}>Добавить упражение</Button>
      <Button variant="contained" sx={{
        marginTop: "20px",
        color: "#FFFFFFFF",
        background: "#4758d6",
        borderRadius: "20px",
        width: "100%",
        fontWeight: "700",
        padding: "8px 15px"
      }}>Сохранить</Button>
    </div >
  )
}
