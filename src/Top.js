import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Top = (props) => {

    const [topitems, setTop] = useState([]);

    const getTop = () => {
        axios.get('https://api.binder.codes/users/top').then(response => {
            setTop(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getTop();
    }, []);

    return (
        <div className="Top">
            <div className="marginBar">
            </div>
            <h2 className="color-white">Top Voted Bikes</h2>
            <div className="marginBar">
            </div>
            {topitems.map((item, idx) => (
                <div key={idx} className="topImageHolder">
                    <h2 className="topLabel">#{idx+1} Highest Rated</h2>
                    <div className="topImage"> 
                        <img src={'https://api.binder.codes/getimage/'+item.Accounts_id} id="displayImg1" className="displayImg1" alt="Loading..."></img>
                    </div>
                </div>
            ))}
        </div>
    );
}
  
export default Top;