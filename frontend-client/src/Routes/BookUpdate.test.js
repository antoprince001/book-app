import React from 'react';
import { shallow } from 'enzyme';
import BookUpdate from './BookUpdate';
import BookForm from '../Components/BookForm';

describe('Test BookUpdate Component', () => {

  let form;

  beforeEach(() => (form = shallow(<BookUpdate />)))

  it('Should render a form', () => {
    expect(form.containsMatchingElement(<BookForm />)).toEqual(true)
  });

})