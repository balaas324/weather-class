import React from 'react';
import { apiConfig } from './apiKey';
import { DayCard } from './DayCard';

class WeekContainer extends React.Component {
    state= {
        fullData: [],
        dailyData: []
    }

    componentDidMount = () => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?zip=11102&units=metric&APPID=${apiConfig}`

        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            }, () => console.log(this.state))
        })
    }

    formatDayCard =()=> {
        return this.state.dailyData.map((reading, index)=> 
            <DayCard readingProp={reading} key={index} />
        )
    }

  render() {
    return (
        <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
            <h5 className="display-5 text-muted">Budapest, HU</h5>
            <div className="row justify-content-center">
                {this.formatDayCard()}
            </div>
        </div>
    )
  }
}

export default WeekContainer;