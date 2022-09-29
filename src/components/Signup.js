import * as React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { AuthContext } from '../context/AuthContext';
import { database, storage } from '../firebase';

export default function Signup() {
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
  // const classes = useStyles();
  // add some comment here for test
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleClick = async () => {
    if (file == null) {
      setError('Please upload profile image first');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    try {
      setError('');
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      console.log(uid);
      const uploadTask = storage.ref(`/users/${uid}_profile_img`).put(file);
      uploadTask.on('state_changed', fn_progress, fn_error, fn_response);
      function fn_progress(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
      }
      function fn_error() {
        setError(error);
        setTimeout(() => {
          setError('');
        }, 2000);
        setLoading(false);
      }
      function fn_response() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set({
            userId: uid,
            fullName: fullname,
            email: email,
            profileUrl: url,
            createdAt: database.getTimeStamp(),
          });
        });
        setLoading(false);
        navigate('/');
      }
    } catch (e) {
      setError(e);
      setTimeout(() => {
        setError('');
      }, 2000);
      setLoading('');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/loginapp-937d2.appspot.com/o/data%2Finsta.jpg?alt=media&token=c1c02297-4310-4fd4-9735-14149e71ca86" />
          </div>
          <CardContent>
            <Typography
              style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}
            >
              Signup to see photos and videos of our friends
            </Typography>
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
              type="password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <Button
              variant="outlined"
              fullWidth={true}
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
              size="small"
            >
              Upload profile image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              fullWidth={true}
              disabled={loading}
              onClick={handleClick}
            >
              Signup
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}
            >
              By signup, you agree to our terms, Data Policy and Cookie policy.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" style={{ marginTop: '3%', height: '8vh' }}>
          <CardContent>
            <Typography
              style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}
            >
              Having an account?
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
