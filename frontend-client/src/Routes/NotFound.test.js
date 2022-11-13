import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('Test Not Found Component', ()=>{

  let notFound;

  beforeEach(() => (notFound = shallow(<NotFound />)))

  it('Should render a Link',()=>{
    expect(notFound.find('Link').length).toEqual(1);
  });

  it('Should have proper message',()=>{
    expect(notFound.find('h2').text()).toMatch(/Requested Page Not Found !/);
  });
})