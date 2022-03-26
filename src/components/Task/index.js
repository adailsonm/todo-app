import React from "react";
import './index.css';

function Task() {
    return (
        <div className="list">
            <ul className="task-status-list">
                <li>
                    <p>To do</p>
                </li>
                <ul class="confirms">
                    <li>
                        <div>
                            <input type="checkbox"/>
                        </div>
                        <label>Güncelleme ve yenilikleri mail olarak almak istiyorum.</label>
                    </li>
                    <li>
                        <div>
                            <input type="checkbox"/>
                        </div>
                        <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nisl eget nunc molestie maximus.</label>
                    </li>
                </ul>
                        
                <li>
                    <p>Done</p>
                </li>
                <ul class="confirms">
                    <li>
                        <div>
                            <input type="checkbox"/>
                        </div>
                        <label>Güncelleme ve yenilikleri mail olarak almak istiyorum.</label>
                    </li>
                    <li>
                        <div>
                            <input type="checkbox"/>
                        </div>
                        <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nisl eget nunc molestie maximus.</label>
                    </li>
                </ul>
            </ul>

            <div className="addTask">
                <input type="text" placeHolder="Task"/>
                <button>Adicionar</button>
            </div>
        </div>

    );   
}

export default Task;