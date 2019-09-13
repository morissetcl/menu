import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RestaurantCard from './RestaurantCard'
import Loader from './reusable_components/Loader';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { getDataArea } from '../apis/Dashboard'

class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      areaData: []
    }
    this.collectDataArea();
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  collectDataArea() {
    getDataArea(this.state.userId).then(data => {
      data[Object.keys(data)[0]].map((response, index) => {
        const key = response[0]
        const value = Object.values(response[1]).join()
        console.log(parseInt(value))
        this.state.areaData.push({ name: key, value: parseInt(value) })
      });
      this.forceUpdate();
    });
  }

  render(){
    const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };
  const COLORS = ['#c70d3a', '#230338', '#ed5107', '#02383c', '#47e4bb', '#584b42'];
    return (
      <div className='filter-container'>
        <PieChart width={400} height={600}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.state.areaData}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          >
            {
              this.state.areaData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </div>

    )
  }
}

export default AreaChart
