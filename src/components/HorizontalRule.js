import React from 'react';
import {getPixelsPerInch} from './helpers.js';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import '../app/App.css'

const loop = (data) => {
    return data.map((item) => {
        if (item[1] === 5) {
            return <svg><line x1={item[0] + 30} y1={11} x2={item[2] + 30} y2={item[3]} stroke="black"/><text x={item[0] + 27} y="11" font-size="10" fill="crimson">{item[4]}</text></svg>
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
      overlay={value}
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
    }
    
    render() {
        return <div className="horizontalRule">
            <div className="slider">
                <Slider
                    defaultValue={0}
                    handle={handle}
                    max={document.designData.documentWidth/getPixelsPerInch()}
                    trackStyle={{ marginLeft: 0, backgroundColor: 'slateGray', height: 3 }}
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
            <svg width={document.designData.documentWidth + getPixelsPerInch()}>{loop(this.getLines())}</svg>
        </div>;
    }
    
    onAfterChange(value) {
    }
    
    getLines() {
        let retval = [];
        
        let ppi = getPixelsPerInch();
        let eigthInch = ppi/8;
        let cx = (document.designData.documentWidth/eigthInch);
        for (let i = 1; i <= cx; i++) {
            let xpos = Number(i*eigthInch);
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
        }

        return retval;
    }
}

export {HorizontalRule};