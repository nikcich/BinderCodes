import React from "react";
import './App.css';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ImageIcon from '@material-ui/icons/Image';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';

const BoardItem = (props) => {
    const{ 
        item
    } = props;

    const bttnStyle={
        width: "9vh",
        height: "6vh",
        maxHeight: "6vh",
        maxWidth: "9vh",
        backgroundColor: "red",
        filter: "drop-shadow(.2vw .2vw .4vw #242424)",
    };

    const bttnStyle2={
        width: "9vh",
        height: "6vh",
        maxHeight: "6vh",
        maxWidth: "9vh",
        backgroundColor: "rgb(255, 115, 0)",
        filter: "drop-shadow(.2vw .2vw .4vw #242424)",
    };
    
    const iconStyles={
        margin: "0",
        padding: "0",
        height: "3vh", 
        width: "3vh", 
        maxHeight: "3vh" 
    };

    const deleteImage = (users_id, location) => {
        axios.post('http://binder.codes//delete/image', {id: users_id, location: location}).then(result => {
        });
    }

    const deleteUser = (users_id, location) => {
        axios.post('http://binder.codes/delete', {id: users_id, location: location}).then(result => {
        });
    }

    const resetUser = (users_id, location) => {
        axios.post('http://binder.codes/reset', {id: users_id, location: location}).then(result => {
        });
    }
  
    return(
        <div className="boarditem">
            <div className="boardupper">
                <div className="upperdivision">
                    <h2 className="boarditemlabel">
                        User: {item.username}
                    </h2>
                </div>
                <div  className="upperdivision">
                    <h2 className="boarditemlabel">
                        ID: {item.id}
                    </h2>
                </div>
                <div  className="upperdivision">
                    <h2 className="boarditemlabel">
                        ref: {item.ref}
                    </h2>
                </div>
                <div  className="upperdivisionLast">
                    <h2 className="boarditemlabel">
                    Img: {item.location}
                    </h2>
                </div>
            </div>
             
            <div className="boardlower">
                <div className="lowerdivision">
                    <div className="boardImageHolder">
                        <div className="boardImage"> 
                            <img src={'https://binder.codes/getimage/'+item.users_id} id="displayImg1" className="displayImg1" alt="Loading..."></img>
                        </div>
                    </div>
                </div>
                <div  className="lowerdivision">
                    <h2 className="boarditemlabel">
                        Yes: {item.yes}
                    </h2>
                </div>
                <div  className="lowerdivision">
                    <h2 className="boarditemlabel">
                        No: {item.no}
                    </h2>
                </div>
                <div className="lowerdivisionLast">
                    <Button 
                        variant="contained"
                        color="primary" 
                        component="span" 
                        style={bttnStyle}
                        onClick={() => deleteImage(item.id, item.location)}
                        startIcon={<ImageIcon style={iconStyles}/>}
                        endIcon={<DeleteIcon style={iconStyles}/>}
                    />
                    <Button 
                        variant="contained"
                        color="primary" 
                        component="span" 
                        style={bttnStyle}
                        onClick={() => deleteUser(item.id, item.location)}
                        startIcon={<AccountCircleIcon style={iconStyles}/>}
                        endIcon={<RemoveCircleOutlineIcon style={iconStyles}/>}
                    />
                    <Button 
                        variant="contained"
                        color="primary" 
                        component="span" 
                        style={bttnStyle2}
                        onClick={() => resetUser(item.id, item.location)}
                        startIcon={<RotateLeftIcon style={iconStyles}/>}
                        endIcon={<AccountCircleIcon style={iconStyles}/>}
                    />
                </div>
                
            </div>
        </div>
    )
  }

export default BoardItem;