import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ColorBackground } from "../../../shared/styles/colors";
import { registerAuth } from "../../../shared/api/authService";

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // Добавляем поле email
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // Для отображения ошибок

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Регулярное выражение: разрешены только латинские буквы, цифры и символ "_"
        const isValid = /^[a-zA-Z0-9_]*$/.test(value);

        // Если значение соответствует регулярному выражению, обновляем состояние
        if (isValid) {
            setUsername(value);
        }
    };

    const handleRegister = async () => {
        setError(null);

        if (password !== confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }

        try {
            if (email.length > 0 && username.length > 0 && password.length > 0 && confirmPassword.length > 0) {
                // Вызываем функцию регистрации
                await registerAuth(email, username, password);
                navigate("/");
                window.location.reload();
            } else {
                setError("Заполните все поля!");
            }
        } catch (err) {
            // Обрабатываем ошибку регистрации
            setError((err as Error).message || "Ошибка регистрации.");
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex center w-full h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Логотип */}
                <svg width="350" height="84" viewBox="0 0 608 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64.7112 63.828C64.7112 78.832 55.0392 90.364 33.9592 90.364C18.4592 90.364 7.42319 84.164 0.727188 77.716L10.5232 67.052C17.2192 72.756 24.5352 76.104 33.8352 76.104C45.8632 76.104 49.2112 70.4 49.2112 64.944C49.2112 44.236 0.975188 56.636 0.975188 25.76C0.975188 11.252 11.5152 0.835997 31.1072 0.835997C44.4992 0.835997 55.5352 5.796 63.3472 12.492L54.2952 23.776C46.4832 17.452 38.9192 15.096 31.2312 15.096C20.8152 15.096 16.4752 19.312 16.4752 24.52C16.4752 42.004 64.7112 30.472 64.7112 63.828ZM90.2826 113.8H75.4026V57.876C75.4026 37.912 89.6626 26.008 107.767 26.008C126.615 26.008 139.511 38.78 139.511 57.876C139.511 77.096 126.615 89.992 108.511 89.992C99.5826 89.992 93.2586 86.768 90.2826 82.924V113.8ZM124.631 58C124.631 46.468 117.811 39.648 107.395 39.648C97.1026 39.648 90.2826 46.468 90.2826 58C90.2826 69.532 97.1026 76.352 107.395 76.352C117.811 76.352 124.631 69.532 124.631 58ZM149.625 58C149.625 38.904 162.521 26.132 181.741 26.132C200.961 26.132 213.733 38.904 213.733 58C213.733 77.22 200.961 90.116 181.741 90.116C162.521 90.116 149.625 77.22 149.625 58ZM164.505 58.124C164.505 69.656 171.325 76.476 181.617 76.476C192.033 76.476 198.853 69.656 198.853 58.124C198.853 46.592 192.033 39.772 181.617 39.772C171.325 39.772 164.505 46.592 164.505 58.124ZM224.415 54.28C224.415 35.432 236.319 25.884 255.167 25.884V39.524C245.247 39.524 239.295 44.36 239.295 54.28V89H224.415V54.28ZM297.113 76.228V89.868C276.777 89.868 265.989 79.576 265.989 60.48V2.19999H280.869V27H295.005V40.64H280.869V60.356C280.869 71.64 285.457 76.228 297.113 76.228ZM344.56 89H329.06L301.656 2.19999H317.652L336.872 64.076L355.968 2.19999H371.964L344.56 89ZM386.769 49.32H417.893C415.289 43.244 409.709 39.772 402.269 39.772C394.953 39.772 389.373 43.244 386.769 49.32ZM402.269 76.476C408.469 76.476 413.305 74.12 416.281 69.78H432.525C428.433 82.304 417.397 90.116 402.393 90.116C383.173 90.116 370.277 77.22 370.277 58C370.277 38.904 383.173 26.132 402.393 26.132C421.613 26.132 434.385 38.904 434.385 58C434.385 59.736 434.261 61.348 434.137 62.96H385.653C387.265 71.516 393.465 76.476 402.269 76.476ZM445.068 54.28C445.068 35.432 456.972 25.884 475.82 25.884V39.524C465.9 39.524 459.948 44.36 459.948 54.28V89H445.068V54.28ZM500.529 43.74C500.529 52.792 534.257 47.088 534.257 70.276C534.257 82.924 524.213 89.744 510.077 89.744C496.933 89.744 488.501 83.792 484.657 80.32L492.593 68.664C497.801 73.624 504.373 76.104 510.449 76.104C515.533 76.104 519.377 74.368 519.377 70.772C519.377 60.108 485.649 66.68 485.649 43.988C485.649 32.58 494.205 26.008 508.217 26.008C520.493 26.008 528.553 30.968 534.009 35.432L526.073 46.964C519.501 41.508 513.053 39.648 507.969 39.648C503.133 39.648 500.529 41.26 500.529 43.74ZM559.554 49.32H590.678C588.074 43.244 582.494 39.772 575.054 39.772C567.738 39.772 562.158 43.244 559.554 49.32ZM575.054 76.476C581.254 76.476 586.09 74.12 589.066 69.78H605.31C601.218 82.304 590.182 90.116 575.178 90.116C555.958 90.116 543.062 77.22 543.062 58C543.062 38.904 555.958 26.132 575.178 26.132C594.398 26.132 607.17 38.904 607.17 58C607.17 59.736 607.046 61.348 606.922 62.96H558.438C560.05 71.516 566.25 76.476 575.054 76.476Z" fill="#4758D6" />
                </svg>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {/* Поле ввода email */}
                <TextField
                    sx={{
                        width: '300px',
                        "& .MuiOutlinedInput-root": {
                            color: "#000",
                            fontFamily: "Arial",
                            fontWeight: "bold",
                            "& .MuiOutlinedInput-notchedOutline": {
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    color: ColorBackground,
                                    borderColor: ColorBackground,
                                },
                            },
                            "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    color: ColorBackground,
                                    borderColor: ColorBackground,
                                },
                            },
                        },
                        "& .MuiInputLabel-outlined": {
                            "&.Mui-focused": {
                                color: ColorBackground,
                                borderColor: ColorBackground,
                            },
                        }
                    }}
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}

                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Поле ввода логина */}
                <OutlinedInput
                    sx={{
                        width: '300px',
                        color: "#000", // Цвет текста
                        // fontFamily: "Arial",
                        // fontWeight: "bold",
                        '& .MuiOutlinedInput-notchedOutline': {
                            // borderColor: ColorBackground, // Цвет рамки по умолчанию
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: ColorBackground, // Цвет рамки при наведении
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: ColorBackground, // Цвет рамки при фокусе
                        },
                        '& .MuiInputLabel-outlined': {
                            color: "#000", // Цвет лейбла по умолчанию
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: ColorBackground, // Цвет лейбла при фокусе
                        },
                    }}
                    id="username"
                    label="Имя на латинице"
                    value={username}
                    startAdornment={<InputAdornment position="start">@</InputAdornment>}
                    onChange={handleUsernameChange}
                />

                <FormControl
                    sx={{
                        width: '300px',
                        "& .MuiOutlinedInput-root": {
                            color: "#000",
                            fontFamily: "Arial",
                            fontWeight: "bold",
                            "& .MuiOutlinedInput-notchedOutline": {
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    color: ColorBackground,
                                    borderColor: ColorBackground,
                                },
                            },
                            "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    color: ColorBackground,
                                    borderColor: ColorBackground,
                                },
                            },
                        },
                        "& .MuiInputLabel-outlined": {
                            "&.Mui-focused": {
                                color: ColorBackground,
                                borderColor: ColorBackground,
                            },
                        }
                    }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Пароль"
                    />
                </FormControl>

                {/* Поле подтверждения пароля */}
                <FormControl
                    sx={{
                        width: '300px',
                        "& .MuiOutlinedInput-root": {
                            color: "#000",
                            fontFamily: "Arial",
                            fontWeight: "bold",
                            "& .MuiOutlinedInput-notchedOutline": {
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    color: ColorBackground,
                                    borderColor: ColorBackground,
                                },
                            },
                            "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    color: ColorBackground,
                                    borderColor: ColorBackground,
                                },
                            },
                        },
                        "& .MuiInputLabel-outlined": {
                            "&.Mui-focused": {
                                color: ColorBackground,
                                borderColor: ColorBackground,
                            },
                        }
                    }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                        Подтвердите пароль
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Подтвердите пароль"
                    />
                </FormControl>

                {/* Кнопка регистрации */}
                <Button
                    sx={{ width: "300px", background: "#4758d6" }}
                    variant="contained"
                    onClick={handleRegister}
                >
                    Регистрация
                </Button>

                {/* Кнопка перехода на страницу входа */}
                <Button
                    sx={{
                        width: "300px",
                        color: "#4758d6",
                    }}
                    variant="text"
                    onClick={handleLogin}
                >
                    Вход
                </Button>
            </div>
        </div>
    );
}