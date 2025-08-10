import {useState} from 'react'

export default function Player({initialName , symbol, isActive, onChangeName}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick(){
        // setIsEditing(!isEditing) this schedules the edit function when executed simultaneously it may not work
        setIsEditing((editing) => !editing); //So, this is the best to use to get the actual value of the previous state
        
        if(isEditing){
            onChangeName(symbol, playerName);
        }
       
    }

    let editablePlayerName = <span className = "player-name">{playerName}</span>;
    // let buttonName = "Edit";

    if(isEditing){
        editablePlayerName = <input type = "text" value = {playerName} required onChange = {handleChange}/>;
        // buttonName = "save";
    }
   
    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);
    }


    return(
        <li className = {isActive ? 'active' : undefined}>
            <span className = "player">
            {editablePlayerName}
            <span className = "player-symbol">{symbol}</span>
            </span>
            <button onClick = {handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}