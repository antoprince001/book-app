import React from 'react';
import { shallow , render } from 'enzyme';
import Home from './Home';
import BookTable from '../Components/BookTable';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Test Home Component', () => {

  let container;

  beforeEach(() => (container = shallow(<Home />)))

  it('Should render BookTable', () => {
    expect(container.containsMatchingElement(<BookTable />)).toEqual(true)
  });

  it('Should render Add Book Button', () => {
    expect(container.find('button').text()).toMatch(/Add Book/);
  });

})