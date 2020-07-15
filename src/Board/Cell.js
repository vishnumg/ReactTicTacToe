import React from 'react'
import logo from '../logo.svg';
import blankImg from './blank.png';
import xImg from './x.png';
import oImg from './o.png';


function cell(props) {
    const imgs = [blankImg, xImg, oImg]
    const img = imgs[props.val||0]
    return (
        <img onClick={props.onClick.bind(this, props.row, props.col, props.val)} src={img} height="100px" border='1px'/>
    )
}

export default cell
