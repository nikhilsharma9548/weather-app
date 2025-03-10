const container =  document.querySelector(".container");
 
const search =  document.querySelector(".search-box button");

const weatherBox =  document.querySelector(".weather-box");

const weatherDetails =  document.querySelector(".weather-details");

const error404 =  document.querySelector(".not-found");

search.addEventListener('click',()=>{
    
    const APIKey = 'b07a00e606548ea9c2ab8d92ec607bbe';
    const city = document.querySelector('.search-box input').value;
     if(city== '' )
         return;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`).then( response => response.json())
      .then(data => {
        console.log("City:", data.name);
        console.log("Temperature:", data.main.temp);
        console.log("Weather:", data.weather[0].description);
        console.log("Wind Speed:", data.wind.speed);
      })
      .then(json => {
                    

            if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return; 
           }

           error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weahter-box img');
            const Temperature = document.querySelector('.weather-box .temperature');

            
            const Description = document.querySelector('.weather-box .description');

            const Humidity = document.querySelector('.weather-details .humidity');

            const Wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                
                 case 'Cloud':
                    image.src = 'images/cloud.png';
                    break;

                case 'mist':
                    image.src = 'images/mist.png';
                    break; 

                default:
                    image.src = '';       

            }

            Temperature.innerHTML = `${parseInt(json.main.temp)}<span>`;
            Description.innerHTML = `${json.weather[0].description}`;
            Humidity.innerHTML = `${json.main.humidity}%`;
            Wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });
    });