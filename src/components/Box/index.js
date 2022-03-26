import React from "react";
import Task from '../Task';

import './index.css';

function Box() {
    return (
        <div className="container">
            <div className="title">
                <span>
                    Project A
                </span>
            </div>
            <Task />
        </div>



    );
}

export default Box;