import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react';

export default function Sign() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex center w-full h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <TextField
          sx={{ width: '25ch' }}
          id="login"
          label="Login"
          variant="outlined"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <FormControl sx={{ width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
    </div>
  );
}
