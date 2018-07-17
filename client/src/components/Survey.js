import React from "react";
import { VictoryPie, VictoryContainer } from 'victory';

class Survey extends React.Component {
     
    render() {
      let vals = {};
      if (this.props.values.every(el => el.y === 0)) {
        vals = [{x:"empty", y: 1},
                {x:"empty", y: 1}];
      } else {
        vals = [...this.props.values];
      };
        return (
          <div className="CST_capped">
           <VictoryPie
           colorScale="cool"
            data={vals}
            labels={ d => d.y}
            labelRadius={100}
            containerComponent={<VictoryContainer width={400} height={400} />}
            /> 
         </div>
        )
    }
};

export default Survey;