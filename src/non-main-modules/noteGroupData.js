import React from "react"


export default function NoteGroups({groups,radioChange}){
    const information = [...groups]
    const groupElements = information.map(current => { 
        
        return(
            <div>
                <input type="radio"  id={current.Name} name="selected-group" value={current._id} onChange={radioChange}></input>
                <label for={current.Name}>{`${current.Name}`}</label>
            </div>
        )
        }
        )
    return(
        <div className="select-group" >
            <label for="selected-group">Select Group to add to:</label>
            {groupElements}
        </div>


    )
}