import React from 'react';
import ReactDOM from 'react-dom';
import {RunReportLoginPage} from './RunReportLoginPage';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from '../../__mocks__/localStorageMock';

window.localStorage = localStorage;

configure({ adapter: new Adapter() });

jest.mock('../config/orms.json', () => ([
    {
        "name" : "hr",
        "url"  : "http://localhost:8888/hrorm",
        "defaultUsername" : "user",
        "defaultPassword" : "pass"
    }
]));

it('initializes successfully', () => {
    document.reportId = "hr.100";
    const div = document.createElement('div');
    ReactDOM.render(<RunReportLoginPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('login check',()=>
{
    document.reportId = "hr.100";
    let wrapper = shallow(<RunReportLoginPage/>);
    wrapper.find('input[type="password"]').simulate('blur', {target: {name: 'password', value: 'pass'}});
    expect(wrapper.state('password')).toEqual('pass');
    wrapper.findWhere(n => n.name() === 'input' && n.prop('name') === 'username').simulate('blur', {target: {name: 'username', value: 'user'}});
    expect(wrapper.state('username')).toEqual('user');
    wrapper.findWhere(n => n.name() === 'input' && n.prop('name') === 'orm').value = {'name': 'hr'};
    wrapper.instance().login = jest.fn();
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.instance().login).toHaveBeenCalled();
});