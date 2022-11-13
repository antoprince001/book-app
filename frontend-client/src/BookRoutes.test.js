import React from 'react';
import { shallow } from 'enzyme';
import BookRoutes from './BookRoutes';
import { Route } from "react-router-dom";
import Home from './Routes/Home';
import BookUpdate from './Routes/BookUpdate';
import BookCreate from './Routes/BookCreate';
import NotFound from './Routes/NotFound';

describe('Book Routes Component', () => {

  let container;
  let pathMap = {};


  beforeAll(() => {
    const component = shallow(<BookRoutes />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.element.type;
      return pathMap;
    }, {});
  })

  it('Should render Home Component for / route', () => {
    expect(pathMap['/']).toBe(Home);
  });

  it('Should render BookUpdate Component for /books/:id/update', () => {
    expect(pathMap['/books/:id/update']).toBe(BookUpdate);
  });

  it('Should render BookCreate Component for /books/:id/create', () => {
    expect(pathMap['/books/create']).toBe(BookCreate);
  });

  it('Should render NotFound Component for any other URL', () => {
    expect(pathMap['*']).toBe(NotFound);
  });
})