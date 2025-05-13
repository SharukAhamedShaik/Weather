const ForeCast = ({ forecast }) => {
    // const ForeCast = [
    //     {temperature:"24°C", day:"Monday", date:"11 May", icon: "☀️", condition: "Sunny"},
    //     {temperature:"23°C", day:"Tuesday", date:"12 May", icon: "⛅", condition: "Partly Cloudy"},
    //     {temperature:"22°C", day:"Wednesday", date:"13 May", icon: "🌧️", condition: "Light Rain"},
    //     {temperature:"25°C", day:"Thursday", date:"14 May", icon: "🌤️", condition: "Mostly Sunny"},
    //     {temperature:"26°C", day:"Friday", date:"15 May", icon: "🌩️", condition: "Thunderstorm"},
    //     {temperature:"23°C", day:"Saturday", date:"16 May", icon: "🌦️", condition: "Scattered Showers"},
    //     {temperature:"21°C", day:"Sunday", date:"17 May", icon: "☁️", condition: "Cloudy"}
    // ];
    // const hourlyForeCast =[
    //     { time:'12:00',icon:'☀️',degree:'26°C',windSpeed:'3 km/hr',windIcon:'🍃'},
    //     { time:'6:00',icon:'🌅',degree:'19°C',windSpeed:'6 km/hr',windIcon:'🌫️'},
    //     { time:'10:00',icon:'🌤️',degree:'24°C',windSpeed:'9 km/hr',windIcon:'🍂'},
    //     { time:'15:00',icon:'⛈️',degree:'28°C',windSpeed:'12 km/hr',windIcon:'🌪️'},
    //     { time:'20:00',icon:'🌙',degree:'22°C',windSpeed:'18 km/hr',windIcon:'🕊️'},
    // ]
    const dailyForeCast = forecast.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString()
        if(!acc.find(f => f.date === date)) {
            acc.push({
                temperature: `${item.main.temp}°C`,
                day: new Date(item.dt * 1000).toLocaleDateString("en-EN",{ weekday: 'short'}),
                date: date,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
            })
        }
        return acc;
    }, []).slice(0,7)
    const hourlyForeCast = forecast.slice(0,7).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit'}),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        degree: `${item.main.temp}°C`,
        windSpeed: `${item.wind.speed}`
    }))
    
    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full mt-8"> {/* Added mt-8 here */}
            {/* 7-Day Forecast with reduced height */}
            <div className="w-full lg:w-1/2 px-4 py-3 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white h-[380px] overflow-y-auto mt-10">
                <h2 className=" flex items-center justify-center text-xl font-bold mb-3">7-Day Forecast</h2>
                <div className="space-y-2">
                    {dailyForeCast.map((cast, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-[#0a1a3d] rounded-lg transition-colors">
                            <img src={cast.icon} alt="icon" className="select-none"/>
                            <div className="ml-3 flex-grow">
                                <p className="font-medium text-sm">{cast.day}, {cast.date}</p>
                                <p className="text-xs text-gray-300">{cast.condition}</p>
                            </div>
                            <div className="ml-3">
                                <span className="text-lg font-bold">{cast.temperature}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hourly Forecast with reduced height */}
            <div className="w-full lg:w-1/2 px-4 py-3 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white h-[380px]">
                <h2 className=" flex items-center justify-center text-xl font-bold mb-3">Hourly Forecast</h2>
                <div className="flex overflow-x-auto gap-2 pb-1 h-full items-center">
                    {hourlyForeCast.map((hourCast,index) => (
                        <div key={index} className="flex flex-col items-center bg-[#1c2938] rounded-lg p-2 min-w-[80px] text-center shadow-md hover:bg-[#233143] transition-colors h-[120px] justify-between">
                            <p className="text-xs font-medium">{hourCast.time}</p>
                            <img src={hourCast.icon} alt="hourCastIcon" className="w-16 h-16 select-none"/>
                            <p className="text-sm font-bold">{hourCast.degree}</p>
                            <div className="flex items-center">
                                <span className="text-xs mr-1">{hourCast.windIcon}</span>
                                <p className="text-xs">{hourCast.windSpeed}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ForeCast;