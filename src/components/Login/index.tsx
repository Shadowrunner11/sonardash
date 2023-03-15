import { Typography, Card, CardContent, TextField, Button, CardActions } from '@mui/material'
import { SyntheticEvent } from 'react'

export const LoginCard = () => {
  function onSubmitHandler(event: SyntheticEvent) {
    event.preventDefault()
    if (!(event.target instanceof HTMLFormElement)) return

    const form = new FormData(event.target)

    form.forEach((value, key) => console.log(value, key))
  }

  return (
    <Card component='form' onSubmit={onSubmitHandler}>
      <CardContent>
        <Typography>Username</Typography>
        <TextField placeholder='Ingresa tu username' name='username' />
        <Typography>Password</Typography>
        <TextField placeholder='Ingresa tu password' name='password' />
      </CardContent>
      <CardActions>
        <Button fullWidth type='submit'>
          Login
        </Button>
      </CardActions>
    </Card>
  )
}
