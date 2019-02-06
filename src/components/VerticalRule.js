import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import {getPixelsPerInch} from './helpers.js';

import 'rc-slider/assets/index.css';
import '../app/App.css'

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={-(value/getPixelsPerInch()).toFixed(2)}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};


const loop = (data) => {
    return data.map(() => {
        return data.map((item) => {
        if (item[0] === 15) {
            return <svg><line x1={18} y1={item[1]} x2={item[2]} y2={item[3]} stroke="black" strokeWidth="1" shapeRendering="crispEdges"/><text x={8} y={item[1]+3} fontSize="10" fill="crimson">{item[4]}</text></svg>
        } else {
            return <line x1={item[0]} y1={item[1]} x2={item[2]} y2={item[3]} stroke="black" strokeWidth="1" shapeRendering="crispEdges"/>;
        }
    });

    });
};

class VerticalRule extends React.Component {
    constructor(props) {
        super(props);
        this.onAfterChange = this.onAfterChange.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.lastWheelTime = 0;
        this.state = {
            top: '0px',
            height: document.designData.currentReport.documentHeight
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({top: nextProps.top, height: nextProps.height});
    }
    
    render() {
        const {height} = this.state;
    
        return <div className="verticalRule" >
            <div className="slider" onWheel={this.onWheel}>
                <Slider ref={(s) => {this.slider = s}}
                    handle={handle}
                    min={-height}
                    defaultValue={0}
                    inverted={true}
                    max={0}
                    onAfterChange={this.onAfterChange}
                    vertical={true}
                    style={{ height: 150}}
                    trackStyle={{  marginLeft: -3, backgroundColor: 'steelBlue', width: 3.5,  height: 150 }}
                    handleStyle={{
                        height: 8,
                        borderColor: 'darkBlue',
                        borderWidth: 1,
                        width: 8,
                        marginTop: -3,
                        marginLeft: -5,
                        backgroundColor: 'silver',
                    }}
                    railStyle={{ marginLeft: -3, backgroundColor: 'steelBlue', width: 3.5, height: 150}}/>
            </div>
            <svg width="33" height={height + getPixelsPerInch()}>{loop(this.getLines())}</svg>
        </div>;
    }

    onWheel(e) {
        let ctime = new Date().getMilliseconds();
        if ((ctime - this.lastWheelTime) > 100) {
            this.lastTime = ctime;
            let newval = this.slider.getValue() - (e.deltaY * 10);
    
            if ((newval <= 0) && (newval >= this.slider.getLowerBound())) {
                this.slider.onChange({value: newval});
                this.onAfterChange(this.slider.getValue());
            }
        }
    }

    onAfterChange(value) {
        this.props.verticalPositionChange(-value);
    }

    getLines() {
        let retval = [];
        const {top, height} = this.state;

        let eigthInch = getPixelsPerInch()/8;
        let y;
        if (top === 0) {
            y = 0;
        } else {
            y = Math.round(Number(top.replace('px', '').replace('-', '')));
        }
        
        let start = Math.round((y/eigthInch)) + 1;
        let cy = (height/eigthInch);
        let ypos = eigthInch + 4;
        for (let i = start; (((i-start)*eigthInch) < window.innerHeight) && (i <= cy); i++) {
            switch(i%8) {
                case 0:
                    retval.push([15, ypos, 31, ypos, i/8]);
                    break;
                case 1:
                    retval.push([25, ypos, 31, ypos]);
                    break;
                case 2:
                    retval.push([22, ypos, 31, ypos]);
                    break;
                case 3:
                    retval.push([25, ypos, 31, ypos]);
                    break;
                case 4:
                    retval.push([20, ypos, 31, ypos]);
                    break;
                case 5:
                    retval.push([25, ypos, 31, ypos]);
                    break;
                case 6:
                    retval.push([22, ypos, 31, ypos]);
                    break;
                case 7:
                    retval.push([25, ypos, 31, ypos]);
                    break;
            }
            
            ypos += eigthInch;
        }

        return retval;
    }
}

export {VerticalRule};