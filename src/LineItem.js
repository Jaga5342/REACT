import React from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';


function LineItem ({item,handleCheck,handleDelete,handleEdit }){
  return (
    <li className="item justify-content-between align-items-center" key={item.id}>
      <Checkbox
          
          type="checkbox"
          onChange ={() => handleCheck(item.id)}
          checked={item.checked}
      />

      <label 
      style = { (item.checked) ? {textDecoration:'line-through'} : null }
      onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
       <Icon
       name= "edit me-3 text-primary"
        onClick = {() => handleEdit(item.id)}
        role="button"
        tabIndex="0"
        aria-label ={`Delete ${item.item}`}
        ></Icon>
       <Icon
       name="trash me-3  text-primary"
       onClick ={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label ={`Edit ${item.item}`}
       ></Icon>
       
      </li>
  )
}

export default LineItem
