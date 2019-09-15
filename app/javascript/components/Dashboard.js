import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './RestaurantCard';
import AreaChart from './AreaChart';
import Loader from './reusable_components/Loader';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { getDataArea } from '../apis/Dashboard';
import CountUp from 'react-countup';
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      userId: props.match.params.userId,
      areaData: [],
      restaurantCount: 0,
      dishCount: 0,
      lastThreeRestaurant: []
    }
    this.collectDataArea();
  }

  collectDataArea() {
    getDataArea(this.state.userId).then(data => {
      this.setState({
        restaurantCount: data['restaurant_counter'],
        dishCount: data['dish_counter']
      });
      this.setState({ lastThreeRestaurant: data[Object.keys(data)[3]] })
      data[Object.keys(data)[0]].map((response, index) => {
        const key = response[0]
        const value = Object.values(response[1]).join()
        this.state.areaData.push({ name: key, value: parseInt(value) })
      });
      this.forceUpdate();
    });
  }

  render(){
    return (
      <div>
        <div className='filter-container col s12'>
          <div class="col m12 l6">
            <h5 className='titre center'>Typologie de votre secteur</h5>
            <AreaChart userId={ this.state.userId } areaData= { this.state.areaData} />
          </div>
          <div class="col m12 l6">
            <h5 className='titre center'>Nombre d'établissements</h5>
              <h5 className='center'><CountUp end={this.state.restaurantCount} duration={3} /></h5>
            <h5 className='titre center'>Nombre de plats</h5>
              <h5 className='center'><CountUp end={this.state.dishCount} duration={3} /></h5>
            <h5 className='titre center'>Derniers restaurants ajoutés</h5>
            <table className='restaurant-dash'>
              <thead>
                <tr>
                    <th>Établissement</th>
                    <th>Adresse</th>
                    <th>Nbre de plats</th>
                </tr>
              </thead>

              <tbody>
                {this.state.lastThreeRestaurant.map(function (item, i) {
                  return <tr key={i}>
                            <Link to={'/restaurant/' + item.id }>
                              <td>{item.name}</td>
                            </Link>
                            <td>{item.full_address}</td>
                            <td>{item.dishes_count}</td>
                          </tr>

                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='filter-container col s12'>
        </div>
      </div>
    )
  }
}

export default Dashboard
