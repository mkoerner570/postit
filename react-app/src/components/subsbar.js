import * as sessionActions from '../store/session';
import React,{useState, useEffect} from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

function SubsBar(){
    const allSubs = useSelector((state) => state.subs)
    const subs = Object.values(allSubs)

    return(
        <div className='subs'>
        <ul className='subs'>
            {subs.map( sub => {
                return(
                <NavLink to={`/sub/${sub.id}/${sub.name}`} exact={true} activeClassName='active' className='links'>-{sub.name}-</NavLink>
                )
            })}
        </ul>
        </div>
    )
}

export default SubsBar
