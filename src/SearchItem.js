import React from 'react'
import { Form } from 'semantic-ui-react'
const SearchItem = ({search,setSearch}) => {
  return (
    <Form className='searchForm' style={{ width: '100%'} } onSubmit ={(e) => e.preventDefault()}>
    
    <label htmlFor="search">Search</label>
    <input 
    fluid
    id='search'
    type="text"
    role='searchbox'
    placeholder='Search'
    value={search}
    onChange ={(e) => setSearch(e.target.value)}
    />
    
    </Form>
  )
}

export default SearchItem
