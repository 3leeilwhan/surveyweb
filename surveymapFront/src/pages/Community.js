import '../App.css';
import Navbar from '../components/Navbar';
import Notebox from '../components/Notebox';
import React from 'react';




function Community() {
    return (
        <div className=" bg-blue-100 min-h-screen">
            <Navbar/>
            <Notebox/>
        </div>
    )
}

export default Community;