import React, { Fragment, useState } from 'react'
import '../styles/sidebar.css'

export function Sidebar() {

    let [loadOrNot, setLoadOrNot] = useState<boolean>(true)

    return (
        <Fragment>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            {loadOrNot ?
                <div className="sidebar">
                    <a><h3>Shop by category</h3></a>
                    <a href="#home"><i className="fa fa-fw fa-home"></i> PC parts</a>
                    <a href="#services"><i className="fa fa-fw fa-wrench"></i> TV & AV</a>
                    <a href="#clients"><i className="fa fa-fw fa-user"></i> Computers & Tablets</a>
                    <a href="#contact"><i className="fa fa-fw fa-envelope"></i> Phones & Accessories</a>
                </div>
                : null}
        </Fragment>
    )
}