import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>emotion</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.emotions.map((val,index) => (
              <tr key={index}>
                <td>{val[0]}</td>
                <td>{val[1]}</td>
              </tr>
              ))
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
