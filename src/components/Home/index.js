// Write your code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamCardsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamCard()
  }

  getTeamCard = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)
    const updateData = data.teams.map(eachCard => ({
      id: eachCard.id,
      name: eachCard.name,
      teamImageUrl: eachCard.team_image_url,
    }))
    this.setState({teamCardsData: updateData, isLoading: false})
  }

  render() {
    const {teamCardsData, isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? (
          <div testid="loader" className="spinner">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="app-card">
            <div className="title-container">
              <img
                className="ipl-logo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
              />
              <h1 className="heading">IPL Dashboard</h1>
            </div>
            <ul className="item-list">
              {teamCardsData.map(eachCard => (
                <TeamCard key={eachCard.id} cardDetails={eachCard} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default Home
