import * as sessionActions from '../store/session';
import React,{useState, useEffect} from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

function SubsBar(){
    const allSubs = useSelector((state) => state.subs)
    const subs = Object.values(allSubs)

    console.log(subs)

    return(
        <div>
            <p>placeholder</p>
            {subs.map( sub => {
                return(
                <li>{sub.name}</li>
                )
            })}
        </div>
    )
}

export default SubsBar
