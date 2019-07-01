import React from 'react';
import {AppToolbar} from './AppToolbar';
import Toolbar from './Toolbar';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from "../../__mocks__/localStorageMock";

configure({ adapter: new Adapter() });

window.localStorage = localStorage;

jest.mock('../config/orms.json', () => ([
    {
        "name" : "hr",
        "url"  : "http://localhost:8888/hrorm",
        "defaultUsername" : "user",
        "defaultPassword" : "pass"
    }
]));

it('new menu click', () => {
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = mount(<AppToolbar/>);
    wrapper.instance().testHelper = jest.fn();
    wrapper.update();
    wrapper.find(Toolbar).findWhere(x=>x.type()==='a' && x.text() === 'New').simulate('click', {});
    expect(wrapper.instance().testHelper).toHaveBeenCalled();
    console.error = originalError;
});

it('preferences menu click', () => {
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = mount(<AppToolbar/>);
    wrapper.instance().testHelper = jest.fn();
    wrapper.update();
    wrapper.find(Toolbar).findWhere(x=>x.type()==='a' && x.text() === 'Preferences').simulate('click', {});
    expect(wrapper.instance().testHelper).toHaveBeenCalled();
    console.error = originalError;
});

it('new report button click', () => {
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = shallow(<AppToolbar/>);
    wrapper.instance().testHelper = jest.fn();
    wrapper.update();
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'add new report').simulate('click', {});
    expect(wrapper.instance().testHelper).toHaveBeenCalled();
    console.error = originalError;
});

it('align text', () => {
    const originalError = console.error;
    console.error = jest.fn();
    let testGetDesignPanel = jest.fn(() => {
        return { getReportSectionDesignCanvas: jest.fn(() =>
            {return {setState: jest.fn(), getSelectedReportObjects: jest.fn(() => [])}}) };
    });
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = shallow(<AppToolbar getDesignPanel={testGetDesignPanel}/>);
    wrapper.instance().alignText = jest.fn();
    wrapper.update();
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align text left').simulate('click', {target: 'e'});
    expect(wrapper.instance().alignText).toBeCalledWith('left');
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align text center').simulate('click', {});
    expect(wrapper.instance().alignText).toBeCalledWith('center');
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align text right').simulate('click', {});
    expect(wrapper.instance().alignText).toBeCalledWith('right');
    console.error = originalError;
});

it('align selected objects', () => {
    const originalError = console.error;
    console.error = jest.fn();
    let testGetDesignPanel = jest.fn(() => {
        return { getReportSectionDesignCanvas: jest.fn(() =>
            {return {setState: jest.fn(), getSelectedReportObjects: jest.fn(() => [])}}) };
    });
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = shallow(<AppToolbar getDesignPanel={testGetDesignPanel}/>);
    wrapper.instance().alignObject = jest.fn();
    wrapper.update();
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align selected objects left').simulate('click', {target: 'e'});
    expect(wrapper.instance().alignObject).toBeCalledWith('left');
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align selected objects top').simulate('click', {});
    expect(wrapper.instance().alignObject).toBeCalledWith('top');
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align selected objects right').simulate('click', {});
    expect(wrapper.instance().alignObject).toBeCalledWith('right');
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'align selected objects bottom').simulate('click', {});
    expect(wrapper.instance().alignObject).toBeCalledWith('bottom');
    console.error = originalError;
});

it('delete selected objects', () => {
    const originalError = console.error;
    console.error = jest.fn();
    let testRemove = jest.fn();
    let testGetDesignPanel = jest.fn(() => {
        return { removeSelectedReportObjects: testRemove }
    });
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = shallow(<AppToolbar getDesignPanel={testGetDesignPanel}/>);
    wrapper.instance().deleteSelectedObjects = jest.fn();
    wrapper.update();
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'Delete').simulate('click', {target: 'e'});
    expect(testRemove).toHaveBeenCalled();
    console.error = originalError;
});

it('save', () => {
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = shallow(<AppToolbar />);
    wrapper.instance().onSave = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'Save').simulate('click', {});
    expect(wrapper.instance().onSave).toHaveBeenCalled();
    console.error = originalError;
});

it('run', () => {
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    let wrapper = shallow(<AppToolbar />);
    wrapper.instance().onRun = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.findWhere(x=>x.type()==='button' && x.prop('title') === 'Run').simulate('click', {});
    expect(wrapper.instance().onRun).toHaveBeenCalled();
    console.error = originalError;
});