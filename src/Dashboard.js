import React, {useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import Bar from './Bar';
import BoardItem from './BoardItem';

const Dashboard = (props) => {
    const{ 
        user
    } = props;

    const [board, getBoard] = useState([]);
    const [realUser, setRealUser] = useState('-1');

    useEffect(() => {
        axios.get('https://api.binder.codes/dashboard/data/'+user).then(response => {
            getBoard(response.data);
            setRealUser(user);
        });
    }, []);
  
  
    return(
      <div>
        <Bar></Bar>
        <div className="dashboard">
            <div className="marginBar"></div>
            {(realUser==='1' || realUser===1)?(
                ()=>{console.log('reee')},
                board.map((item,idx) => (
                    <BoardItem key={idx} item={item} />
                ))
            ):(
                <div>
                    <h1>ACCESS DENIED</h1>
                </div>
            )}
        </div>
      </div> 
    )
  }

export default Dashboard;