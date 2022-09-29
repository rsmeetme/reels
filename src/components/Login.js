import * as React from 'react';
import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './login.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  // console.log(store);
  // const useStyles = makeStyles({
  //   text1: {
  //     color: 'grey',
  //     textAlign: 'center',
  //   },
  //   card2: {
  //     height: '3vh',
  //     marginTop: '3%',
  //   },
  // });
  // const classes = useStyles()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let handleClick = async () => {
    try {
      setError('');
      setLoading(true);
      let res = await login(email, password);
      // console.log('Res', res);
      setLoading(false);
      navigate('/');
    } catch (e) {
      setError(error);
      setTimeout(() => {
        setError('');
      }, 200);
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div
        className="insta-slider"
        style={{
          backgroundImage: `url(${'https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2F1dc085cdb87d.png?alt=media&token=7c349e6e-657f-4545-b853-e54b66e24bf4'})`,
          backgroundPosition: 'cover',
        }}
      >
        <div className="slider">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={4}
            naturalSlideWidth={238}
            naturalSlideHeight={510}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            touchEnabled={true}
            dragEnabled={true}
            totalSlides={4}
          >
            <Slider>
              <Slide index={0}>
                <Image src="https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2Finsta_1.png?alt=media&token=8ea638d8-372d-497e-bec7-d5a7b3e5a1bb" />
              </Slide>
              <Slide index={1}>
                <Image src="https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2Finsta_2.png?alt=media&token=28d55424-d407-4b3f-93d2-c20047d881e0" />
              </Slide>
              <Slide index={2}>
                <Image src="https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2Finsta_3.png?alt=media&token=006dced7-f405-4acc-9450-9ce386025055" />
              </Slide>
              <Slide index={3}>
                <Image src="https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2Finsta_4.png?alt=media&token=f598cfed-8386-4a85-96e0-9e84ee3a0aee" />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="login-card">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2Finsta.jpg?alt=media&token=c1c02297-4310-4fd4-9735-14149e71ca86" />
          </div>
          <CardContent>
            {error != '' && <Alert severity="error">{error}</Alert>}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}
            >
              Forgot Password?{' '}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={handleClick}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
        </Card>

        <Card variant="outlined" style={{ marginTop: '3%', height: '8vh' }}>
          <CardContent>
            <Typography
              style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}
            >
              Don't have an account?
              <Link
                to="/signup"
                style={{
                  textDecoration: 'none',
                }}
              >
                Signup
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
