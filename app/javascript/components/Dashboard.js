import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './RestaurantCard';
import AreaChart from './AreaChart';
import Loader from './reusable_components/Loader';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { getDataArea } from '../apis/Dashboard';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      userId: props.match.params.userId
    }
  }

  render(){
    return (
      <div>
        <p>Votre secteur</p>
        <AreaChart userId={ this.state.userId }/>
      </div>
    )
  }
}

export default Dashboard
