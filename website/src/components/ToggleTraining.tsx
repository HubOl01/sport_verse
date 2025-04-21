import { Typography } from "@mui/material";
import { ColorBackground } from "../shared/styles/colors";

interface ToggleTrainingProps {
  alignment: string;
  handleAlignmentChange: (newAlignment: string) => void;
}

export default function ToggleTraining(props: ToggleTrainingProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: ".2s ease-in-out",
          }}
          onClick={() => props.handleAlignmentChange("")}
        >
          <Typography
            variant="body1"
            sx={{
              padding: "10px 10px",
              borderRadius: "20px",
              textTransform: "none",
              textAlign: "center",
              userSelect: "none",
              color: props.alignment === "" ? ColorBackground : "#000",
              transition: ".2s ease-in-out",
            }}
          >
            Публичные тренировочные планы
          </Typography>
          <div
            style={{
              height: "5px",
              borderRadius: "10px",
              width: "100px",
              backgroundColor: props.alignment === "" ? ColorBackground : "transparent",
              transition: ".2s ease-in-out",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: ".2s ease-in-out",
          }}
          onClick={() => props.handleAlignmentChange("/private")}
        >
          <Typography
            variant="body1"
            sx={{
              padding: "10px 10px",
              borderRadius: "20px",
              textTransform: "none",
              textAlign: "center",
              userSelect: "none",
              color: props.alignment === "/private" ? ColorBackground : "#000",
              transition: ".2s ease-in-out",
            }}
          >
            Мои тренировочные планы
          </Typography>
          <div
            style={{
              height: "5px",
              borderRadius: "10px",
              width: "100px",
              backgroundColor: props.alignment === "/private" ? ColorBackground : "transparent",
              transition: ".2s ease-in-out",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
