import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import {getPixelsPerInch} from './helpers.js';
import config from '../config/appconfig.json';
import 'rc-slider/assets/index.css';
import '../app/App.css'

const loop = (data) => {
    return data.map((item) => {
        if (item[1] === 5) {
            return <svg><line x1={item[0] + 30} y1={11} x2={item[2] + 30} y2={item[3]} stroke="black"/><text x={item[0] + 27} y="10" fontSize="10" fill="crimson">{item[4]}</text></svg>
        } else {
            return <line x1={item[0] + 30} y1={item[1]} x2={item[2] + 30} y2={item[3]} stroke="black"/>;
        }
    });
};

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={(value/getPixelsPerInch()).toFixed(2)}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class HorizontalRule extends React.Component {
    constructor(props) {
        super(props);
        this.onAfterChange = this.onAfterChange.bind(this);
        this.state = {
            left: '0px',
            width: document.designData.currentReport.documentWidth
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({left: nextProps.left, width: nextProps.width});
    }

    render() {
        const {width} = this.state;
    
        return <div className="horizontalRule">
            <div className="slider">
                <Slider
                    defaultValue={0}
                    handle={handle}
                    max={width}
                    trackStyle={{ marginLeft: 0, backgroundColor: 'steelBlue', height: 3 }}
                    onAfterChange={this.onAfterChange}
                        handleStyle={{
                        height: 8,
                        borderColor: 'darkBlue',
                        borderWidth: 1,
                        width: 8,
                        marginTop: -3,
                        marginLeft: -2,
                        backgroundColor: 'silver',
                    }}
                railStyle={{ backgroundColor: 'steelBlue', height: 3 }}/>
            </div>
            <svg height="30" width={width + getPixelsPerInch()}>{loop(this.getLines())}</svg>
        </div>;
    }
    
    onAfterChange(value) {
        this.props.horizontalPositionChange(value);
    }
    
    getLines() {
        let retval = [];
        const {left, width} = this.state;
        let x;
        if (left === 0) {
            x = 0;
        } else {
            x = Math.round(Number(left.replace('px', '').replace('-', '')));
        }
        
        let eigthInch = getPixelsPerInch()/8;
        let start = Math.round((x/eigthInch)) + 1;
        let cx = (width/eigthInch);
        let xpos = eigthInch;
        let vp = (window.innerWidth/config.zoomFactor);
        for (let i = start; (((i-start)*eigthInch) < vp) && (i <= cx); i++) {
            switch(i%8) {
                case 0:
                    retval.push([xpos, 5, xpos, 20, i/8]);
                    break;
                case 1:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
                case 2:
                    retval.push([xpos, 12, xpos, 20]);
                    break;
                case 3:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
                case 4:
                    retval.push([xpos, 10, xpos, 20]);
                    break;
                case 5:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
                case 6:
                    retval.push([xpos, 12, xpos, 20]);
                    break;
                case 7:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
            }
            
            xpos += eigthInch;
        }

        return retval;
    }
}

export {HorizontalRule};