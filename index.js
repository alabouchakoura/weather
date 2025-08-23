const temperature=document.getElementById("temperature");
const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind");
const pressure=document.getElementById("pressure");
const description=document.getElementById("description");
const country=document.getElementById("country");
const weather_image=document.getElementById("weather_image");
const city=document.getElementById("city")
const error=document.getElementById("error");
const btn=document.getElementById("btn");
btn.addEventListener("click",run);
async function weather(city_name){
try {
if(city_name===""){
temperature.style.display="none";
humidity.style.display="none";
wind.style.display="none";
pressure.style.display="none";
description.style.display="none";
country.style.display="none";
weather_image.style.display="none";
error.style.display="block";
}
else{
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=f7c1cc507042b560eae2be29340bc562&units=metric`);
if(!response.ok){
temperature.style.display="none";
humidity.style.display="none";
wind.style.display="none";
pressure.style.display="none";
description.style.display="none";
country.style.display="none";
weather_image.style.display="none";
error.style.display="block";
throw new Error(`Response status: ${response.status}`);
    }
    let data= await response.json();
   return {
    temperature:data.main.temp,
    pressure:data.main.pressure,
    humidity:data.main.humidity,
    wind:data.wind.speed,
    description:data.weather[0].description,
    country:data.sys.country,
    icon:data.weather[0].icon,
   };
    }
} catch (error) {
    console.log(error);
}
}
async function run(){
    let data=await weather(city.value);
    temperature.textContent=`Temperature: ${Math.round(data.temperature)}°C`;
    temperature.style.display="block";
    humidity.textContent=`Humidity: ${data.humidity}%`;
    humidity.style.display="block";
    wind.textContent=`Wind: ${data.wind} Km/h`;
    wind.style.display="block"
    pressure.textContent=`Pressure: ${data.pressure} hPa`;
    pressure.style.display="block";
    description.textContent=data.description;
    description.style.display="block";
    country.textContent=data.country;
    country.style.display="block"
    weather_image.style.display="";
    weather_image.src=`https://openweathermap.org/img/wn/${data.icon}@2x.png`
    error.style.display="none";
}
run();