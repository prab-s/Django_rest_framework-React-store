import React, { createContext, Fragment, useEffect, useState } from 'react'
import '../styles/sidebar.css'

export function Sidebar(props:any) {

    return (
        <Fragment>
            {props.load ?
                <div className="sidebar rounded">
                    {props.closable ? <button className='btn btn-secondary btn-sm py-0 px-1 ms-3' onClick={() => props.setLoad(false)}><i className="fa fa-times"></i></button> : null }
                    {props.title.length > 0 ? <a><h3>{props.title}</h3></a> : null}
                    {/* <a href="#home"><i className="fa fa-fw fa-home"></i> PC parts</a>
                    <a href="#services"><i className="fa fa-fw fa-wrench"></i> TV & AV</a>
                    <a href="#clients"><i className="fa fa-fw fa-user"></i> Computers & Tablets</a>
                    <a href="#contact"><i className="fa fa-fw fa-envelope"></i> Phones & Accessories</a> */}
                    {props.list.map((item: any) => (
                        <a key={item.link} href={item.link}>{item.text}</a>
                    ))}
                </div>
                : null
            }
        </Fragment>
    )
}
