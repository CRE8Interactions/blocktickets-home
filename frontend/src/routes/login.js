import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')

  function submit() {
    console.log(phoneNumber)
  }
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
      Verify your mobile number
      </Typography>
      <Typography sx={{ fontSize: 14 }} component="div">
      Enter your mobile number including your country code. You'll receive an access code via text message.
      </Typography>
      <input type="text" onBlur={(e) => setPhoneNumber(e.target.value)} />
      <Typography variant="body2">
      Must include your country-code, for example +1
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={ () => submit() }>Verify</Button>
    </CardActions>
    </Card>
  );
}

export default Login;