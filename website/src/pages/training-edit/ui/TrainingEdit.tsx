import { Button, Card, CardContent, IconButton, TextField } from "@mui/material";
import styles from "./TrainingEdit.module.scss"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


export default function TrainingEdit() {
  const [arr, setArr] = useState<{ titleExercise: string; }[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleExercise, settitleExercise] = useState('');

  const handleAddExercise = () => {
    setArr([...arr, { titleExercise }]);
    settitleExercise('');
  };

  const handleExerciseChange = (index: number, field: 'titleExercise', value: string) => {
    const newArr = [...arr];
    newArr[index][field] = value;
    setArr(newArr);
  };

  const handleDeleteExercise = (index: number) => {
    const newArr = arr.filter((_, i) => i !== index);
    setArr(newArr);
  };

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
      value={title}
      onChange={(e) => setTitle(e.target.value)}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        slotProps={{
          input: {
            style: {
              fontSize: "20px",
            },
            disableUnderline: true,
          },
        }}
      />
      <br />
      <div className={`${styles.name} mb-5`}>Упражения</div>
      {arr.map((exercise, index) => (
        <Card
          className="justify-center content-center self-center"
          key={index} variant="outlined" sx={{
            marginBottom: '20px',
            borderRadius: '20px',
          }}>
          <div className="flex self-center p-2 pr-3 pl-3">
            <div style={{ fontSize: "16px", alignSelf: 'center', paddingRight: "10px" }}>{index + 1}. </div>
            <TextField
              className="w-full self-center"
              placeholder="Название упражнения"
              variant="standard"

              value={exercise.titleExercise}
              onChange={(e) => handleExerciseChange(index, 'titleExercise', e.target.value)}
              slotProps={{
                input: {
                  style: {
                    fontSize: "16px",
                  },
                  disableUnderline: true,
                }
              }}
            />
            <IconButton
              className="w-10 h-10 self-center"
              sx={{ color: "red" }}
              onClick={() => handleDeleteExercise(index)}

            >
              <DeleteIcon />
            </IconButton>
          </div>

        </Card>
      ))}
      <Button variant="contained" sx={{
        color: "#FFFFFF",
        backgroundColor: "rgba(0,0,0,.5)",
        borderRadius: "20px",
        width: "100%",
        padding: "8px 15px",

      }} onClick={handleAddExercise}>Добавить упражение</Button>
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
