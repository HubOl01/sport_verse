import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { IPlanInGroup } from "../../../shared/model/IPlanInGroup";
import CardTrainingInGroup from "./cardTrainingInGroup";
import { TrainingService } from "../../../shared/api/training.service";
import { useAuth } from "../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


interface CardPlanContentProps {
    planInGroup: IPlanInGroup;
    onEdit: () => void;
}

export default function CardPlanContent(props: CardPlanContentProps) {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    const { user: USER } = useAuth();
    const navigate = useNavigate();
    const formattedDate = capitalize(new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
    }).format(new Date(props.planInGroup?.planAt!)));

    async function onClick() {
        try {
            if (Number(USER.userId!) === props.planInGroup.plan?.userId!) {
                navigate(`/training/${props.planInGroup.planId}`)
            } else {
                await TrainingService.copyGroup(
                    (props.planInGroup.groupId).toString(),
                    (props.planInGroup.id)!.toString(),
                    (props.planInGroup.planId).toString(),
                    USER.userId!);

                const existingPlan = await TrainingService.apiTrainingCheckGroup(
                    (props.planInGroup.groupId).toString(),
                    (props.planInGroup.id)!.toString(),
                    (props.planInGroup.planId).toString(),
                    USER.userId!);
                navigate(`/training/${existingPlan.id}`)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
            <Card
                sx={{
                    margin: "10px 15px",
                    width: "100%",
                    maxWidth: "100%",
                    borderRadius: "20px",
                    backgroundColor: "#F0F0F0FF",
                }}>
                <CardContent sx={{
                    padding: "10px 15px 10px 15px",
                }}>
                    <Typography className="flex items-start" gutterBottom variant="h5" fontWeight={600} component="div">
                        {props.planInGroup?.title}
                        {Number(USER.userId!) === props.planInGroup.plan?.userId ?
                            <>
                                <Box sx={{ flexGrow: 1 }}></Box>
                                <IconButton onClick={props.onEdit}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </> : null
                        }
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {props.planInGroup?.desc}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Начало тренировки: {formattedDate}
                    </Typography>
                    <CardTrainingInGroup key={props.planInGroup?.plan!.id} training={props.planInGroup?.plan!} isContent onClick={() => onClick()} />
                </CardContent>
            </Card>
        </div>
    )
}
