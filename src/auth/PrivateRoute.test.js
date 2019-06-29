import React from 'react';
import {MemoryRouter} from 'react-router';
import {PrivateRoute} from '../auth/PrivateRoute';
import {mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {HomePage} from "../components/HomePage";
import {LoginPage} from "./LoginPage";
import {App} from "../app/App";
import localStorage from '../../__mocks__/localStorageMock';
import {ReportContainer} from "../components/ReportContainer";
import {RunReportLoginPage} from "./RunReportLoginPage";

window.localStorage = localStorage;


jest.mock('../config/orms.json', () => ([
    {
        "name" : "hr",
        "url"  : "http://localhost:8888/hrorm",
        "defaultUsername" : "user",
        "defaultPassword" : "pass"
    }
]));

configure({ adapter: new Adapter() });

it('LoginPage route check',()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.removeItem('orm');
    let wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter>);
    expect(wrapper.find(LoginPage)).toHaveLength(1);
    expect(wrapper.find(HomePage)).toHaveLength(0);
    console.error = originalError;
 });

it('RunReportLoginPage route check',()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    document.runReportMode = true;
    document.reportId = "hr.100";
    window.localStorage.removeItem('orm');
    let wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter>);
    expect(wrapper.find(RunReportLoginPage)).toHaveLength(1);
    expect(wrapper.find(ReportContainer)).toHaveLength(0);
    console.error = originalError;
});

it('HomePage route check', ()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    document.reportId = "hr.100";
    document.designData = {currentReport : { reportName: "test", documentWidth: 100, documentHeight: 100}};
    window.localStorage.setItem('orm', JSON.stringify({name: "hr"}));
    let wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><PrivateRoute exact path="/" component={HomePage}/></MemoryRouter>);
    expect(wrapper.find(LoginPage)).toHaveLength(0);
    expect(wrapper.find(HomePage)).toHaveLength(1);
    console.error = originalError;
});

it('ReportContainer route check', ()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    document.designData = {currentReport : { reportName: "test", documentWidth: 100, documentHeight: 100}};
    window.localStorage.setItem('orm', JSON.stringify({name: "test"}));
    let wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><PrivateRoute exact path="/" component={ReportContainer}/></MemoryRouter>);
    expect(wrapper.find(RunReportLoginPage)).toHaveLength(0);
    expect(wrapper.find(ReportContainer)).toHaveLength(1);
    console.error = originalError;
});

