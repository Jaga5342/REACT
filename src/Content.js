
import React from 'react'
import ItemList from './ItemList';
import {Grid} from 'semantic-ui-react';
const Content = ({values,handleCheck,handleDelete,handleEdit,handleSave}) => {

  return (
  <>
  <div className="container justify-content-center align-items-center ">
     
     <Grid>
     <Grid.Row>
     <Grid.Column>
     {(values.length) ? (
       <ItemList 
          values ={values}
         handleCheck ={handleCheck}
         handleDelete ={handleDelete}
         handleEdit ={handleEdit}
         handleSave ={handleSave}
       />
      ) :
     (
     <p className="text-center " style={{ marginTop:'5rem'}}>The List is EMPTY</p>
     )
     }
     </Grid.Column>
     </Grid.Row>
     </Grid>
     </div>
  </>
  )
}
export default Content

