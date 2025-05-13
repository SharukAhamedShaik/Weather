import logo from '../assets/logossa.jpg'
import image from '../assets/image.jpg'
import currentloc from '../assets/currentloc.png'
import { useState } from 'react'
import { toast } from 'react-toastify'
const NavBar = ({onCitySearch, onLocationFetch }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchQuery =(e) => {
        setSearchQuery(e.target.value)
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery) {
            onCitySearch(searchQuery)
            setSearchQuery('')
        }
        else {
            toast.error("Please enter a city name")
          }
    }
    const handleLocationClick = () =>{
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const {latitude, longitude } = pos.coords
                onLocationFetch(latitude, longitude)
                setSearchQuery('')
            }, (error) => {
                console.log(error)
                toast.error("Geolocation is not supported by your browser")
            }
        ) 
        }
    }
  return (
    <div className="m-4">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/*logo*/}
            <img src={logo} alt="logo" className='w-48 select-none'/>
            {/*search bar*/}
            <form onSubmit={handleSearchSubmit} className='relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md'>
                <img src={image} alt='search' className='absolute left-3 w-3 h-3 text-gray-300 select-none'/>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleSearchQuery}
                    placeholder='Search For your Preferred City...'
                    className='w-full py-3 pl-9 pr-9 text-gray-300 placeholder:gray-400 border-none rounded-lg outline-none'
                />
                <button className='bg-slate-300 text-white px-5 py-3'>
                    Search
                </button>
            </form>
            <div onClick={handleLocationClick} className='flex items-center gap-3 px-3 text-sm font-medium text-white bg-green-500 rounded cursor-pointer'>
                <img src={currentloc} alt='location'/>
            </div>
        </div>
    </div>
  )
}

export default NavBar