import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const bttnStyle={
    borderRadius: "3vh",
    backgroundColor: "rgb(216, 4, 85)",
    padding: "1vh 2vh",
    filter: "drop-shadow(.2vh .2vh .4vh #242424)",
    margin: "1vh 1vh 1vh 1vh",
    width: "20vh",
    height: "5vh",
    fontSize: "1.5vh"
    
};

const LoginBox = (props) => {

    const{ 
        setUsername,
        setPassword,
        handleLogin,
        usernameError,
        passwordError,
        handleSignUp
    } = props;

    return (
    <div className="LoginBox">
        <TextField 
            required 
            className="outlined-required" 
            label="Username" 
            variant="outlined" 
            onChange={e => setUsername(e.target.value)}
        />
        <TextField 
            required 
            className="outlined-required" 
            label="Password" variant="outlined" 
            type="password"
            onChange={e => setPassword(e.target.value)}
        />
        <div className="log-sign-buttons">
            <Button 
                className="login-button" 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleLogin}
                style={bttnStyle}
            >
                Login
            </Button>
            <Button 
                className="login-button" 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleSignUp}
                style={bttnStyle}
            >
                Sign Up
            </Button>
        </div>
        { usernameError !== '' ? (
            <h4 className="error-message">{usernameError}</h4>
        ):(
            (passwordError !== '' ? (
                <h4 className="error-message">{passwordError}</h4>
            ):(
                <h4 className="error-message"></h4>
            ))
            
        )}
    </div>
    );
}
  
  export default LoginBox;