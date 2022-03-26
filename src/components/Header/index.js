import React from "react";
import AuthMenu from '../AuthMenu';
import './index.css'


function Header() {
    return (
        <header className="header-top">
            <span className="header-span">Todo List</span>
            <AuthMenu />
        </header>
    )
}

export default Header