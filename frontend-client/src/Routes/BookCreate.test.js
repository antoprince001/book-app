import React from 'react';
import { shallow } from 'enzyme';
import BookCreate from './BookCreate';
import BookForm from '../Components/BookForm';

const mockedUsedNavigate = jest.fn();

describe('Test BookCreate Component', () => {

  let form;

  beforeEach(() => (form = shallow(<BookCreate />)))

  it('Should render a form', () => {
    expect(form.containsMatchingElement(<BookForm />)).toEqual(true)
  });

})