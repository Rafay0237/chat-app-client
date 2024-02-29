import {useState} from 'react'
import SearchBar from '../Components/SearchBar'
import FindUsers from '../Components/FindUsers'
import axios from 'axios'

const About = () => {

  const [search,setSearch]=useState("")
  const [results,setResults]=useState([])

  const handleSearch=async(e)=>{
  e.preventDefault()
  if(search==="")
  return
    try{
        await axios.get(process.env.REACT_APP_API_URL+"users/search-users/"+search)
        .then((res)=> setResults(res.data.user))
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className='pt-5 text-center overflow-hidden bg-blue-50 '>
    <SearchBar setSearch={setSearch} handleSearch={handleSearch}/>
    <FindUsers data={results}/>
  </div>
  )
}

export default About
