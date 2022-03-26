import React from "react";
import Task from '../Task';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';

export function Box() {
    return (
        <div className="container">
            <div className="title">
                <span>
                    Project A
                </span>
                <FontAwesomeIcon icon="trash" />
            </div>
            <Task />
        </div>
    );
}
