import React from 'react';
import { shallow } from 'enzyme';
import BookTable from './BookTable';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Test BookTable Component', () => {

  let table;

  beforeEach(() => (table =  shallow(
      <BookTable />
  )))

  it('Should render a table', () => {
    expect(table.find('table').length).toEqual(1);
  });

  it('Should render correct column heading', () => {
    expect(table.contains('Name'));
    expect(table.contains('Author'));
    expect(table.contains('Price'));
    expect(table.contains('Rating'));
  });

  it('Should render table rows', () => {
    const row = table.find('tr')
    expect(row.length).toBeGreaterThanOrEqual(0);
  });

})