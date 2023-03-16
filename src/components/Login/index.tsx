import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { useState } from 'react'
import { useLogin } from 'react-admin'

const BasicInputs = () => (
  <>
    <Typography fontWeight={400}>Username</Typography>
    <TextField placeholder='Ingresa tu username' name='username' />
    <Typography fontWeight={400}>Password</Typography>
    <TextField placeholder='Ingresa tu password' name='password' />
  </>
)

export const LoginCard = () => {
  const [ isTokenView, setIsTokenView ] = useState(false)

  const login = useLogin()

  function onClickToken(event) {
    event.preventDefault()
    setIsTokenView((prev) => !prev)
  }

  function onSubmitHandler(event) {
    //console.log(event)
    event.preventDefault()
    const form = new FormData(event.target)
    const loginData = {}
    form.forEach((value, key) => {
      loginData[key] = value
    })

    login(loginData).catch(console.error)
  }

  return (
    <Card component='form' sx={{ minHeight: 400 }} onSubmit={onSubmitHandler}>
      <CardContent sx={styles.cardContent}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Typography variant='h5' fontWeight={300} marginBottom={1}>
            Bienvenido !
          </Typography>
          <FormControlLabel control={<Switch checked={isTokenView} onClick={onClickToken} />} label='token' />
        </Box>
        <Typography variant='h4' fontWeight={500}>
          Login
        </Typography>
        <Typography variant='h6' fontWeight={400} marginBottom={3}>
          Servicio de reporteria
        </Typography>
        {isTokenView ? (
          <>
            <Typography fontWeight={400}>Token</Typography>
            <TextField placeholder='Ingrese su token' name='username' />
          </>
        ) : (
          <BasicInputs />
        )}
      </CardContent>
      <CardActions>
        <Button fullWidth type='submit' sx={styles.button}>
          Login
        </Button>
      </CardActions>
    </Card>
  )
}

const styles = {
  button: {
    backgroundColor: '#000',
    '&:hover': { backgroundColor: '#191919' },
    color: '#fefefe',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
