import sun from '../assets/sun.png'
import Clock from './Clock'
import Sunrise from '../assets/Sunrise.png'
import Sunset from '../assets/Sunset.png'
import Sunny from '../assets/Sunny.png'
import Humidity from '../assets/Humidity.png'
import Wind from '../assets/Wind.png'
import Pressure from '../assets/Pressure.png'
import UV from '../assets/UV.png'
import ForeCast from './ForeCast'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CityAndTime = ({ cityName, lat, lon, setLat, setLon }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [ForecastData, setForeCastData] = useState(null)
  const [UVIndex, setUVIndex] = useState(null)
  const fetchData = async () => {
    try {
      const encodedCity = encodeURIComponent(cityName)
      let url;
      if (encodedCity) {
        url=`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&&appid=0cd8e407150a66e7fd0b0a4db1fdea59`;
      } else if (lat && lon) {
        url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&appid=0cd8e407150a66e7fd0b0a4db1fdea59`;
      } else {
        toast.error("Missing city name or coordinates")
      }
      const currentWeather = await axios.get(url)
      setWeatherData(currentWeather.data)
      const {coord} = currentWeather.data
      setLat(coord.lat)
      setLon(coord.lon)
      const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&&appid=0cd8e407150a66e7fd0b0a4db1fdea59`)
      setForeCastData(forecast.data)
      const UV = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=0cd8e407150a66e7fd0b0a4db1fdea59`)
      setUVIndex(UV.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!cityName && (!lat || !lon)) {
      navigator. geolocation.getCurrentPosition(
        (pos) => {
          const {latitude, longitude } = pos.coords
          setLat(latitude)
          setLon(longitude)
          fetchData(latitude, longitude)
        },
        (error) => {
          console.log("Geolocation error:",error)
          toast.error("Location access denied. Please enter a city manually.")
        }
      )
    } else {
      fetchData(lat,lon)
    }
  }, [cityName,lat,lon])
  if (!weatherData || !ForecastData) {
    return <div className='flex items-center justify-center text-white text-2xl md:text-6xl'>Loading...</div>
  }
  const { main, sys, weather, wind } = weatherData
  const { list} = ForecastData
  const weatherIconurl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left section: City and Time with Clock only */}
        <div className="w-full md:w-1/3 h-auto bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">{cityName || weatherData.name}</h1>
          <img src={weatherIconurl} alt="Weather Icon" className='w-32 select-none'/>
          <div className="text-center">
            <Clock />
          </div>
        </div>
        
        {/* Right section: Weather Details */}
        <div className='flex-grow h-auto bg-[#050e1fde] shadow-2xl rounded-lg text-white p-4'>
          <div className='flex flex-col md:flex-row h-full'>
            {/* Left part - Temperature and Sunrise/Sunset */}
            <div className='flex flex-col justify-between md:w-2/5'>
              <div className='text-center'>
                <h1 className='text-5xl md:text-7xl font-bold'>{Math.round(main.temp)}&#8451;</h1>
                <p className='text-center'>
                  Feels like: <span className='text-lg md:text-xl ml-2 font-bold'>{Math.round(main.feels_like)}&#8451;</span>
                </p>
              </div>
              <div className='flex justify-center gap-4 mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                  <img src={Sunrise} alt='Sunrise' className='h-8 select-none'/>
                  <div className='text-center'>
                    <h6>Sunrise</h6>
                    <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()} AM</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <img src={Sunset} alt='Sunset' className='h-8 select-none'/>
                  <div className='text-center'>
                    <h6>Sunset</h6>
                    <p>{new Date(sys.sunset * 1000).toLocaleTimeString()} PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Center part - Sunny icon */}
            <div className='flex flex-col items-center justify-center md:w-1/5 my-4 md:my-0'>
              <img src={weatherIconurl} alt='weather Icon' className='w-24 md:w-32 select-none'/>
              <p className='font-bold text-xl md:text-2xl mt-2'>{[weather[0].description]}</p>
            </div>
            
            {/* Right part - Weather stats */}
            <div className='flex flex-col justify-center md:w-2/5'>
              <div className='grid grid-cols-2 gap-4 ml-auto'>
                <div className='flex flex-col items-center gap-1'>
                  <img src={Humidity} alt='humidity' className='h-8 select-none'/>
                  <p>{main.humidity}</p>
                  <h6 className='text-sm'>Humidity</h6>
                </div>
                <div className='flex flex-col items-center gap-1'>
                  <img src={Pressure} alt='Pressure' className='h-8 select-none'/>
                  <p>{main.pressure}hpa</p>
                  <h6 className='text-sm'>Pressure</h6>
                </div>
                <div className='flex flex-col items-center gap-1'>
                  <img src={Wind} alt='WindSpeed' className='h-8 select-none'/>
                  <p>{wind.speed}Km/hr</p>
                  <h6 className='text-sm'>Wind Speed</h6>
                </div>
                <div className='flex flex-col items-center gap-1'>
                  <img src={UV} alt='UV' className='h-8 select-none'/>
                  <p>{UVIndex !== null ? UVIndex :'N/A'}</p>
                  <h6 className='text-sm'>UV</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ForeCast forecast={ list } />
    </>
  )
}

export default CityAndTime