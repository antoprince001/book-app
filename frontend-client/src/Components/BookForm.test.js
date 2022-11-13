import React from "react";
import BookForm from "./BookForm";
import {shallow} from "enzyme";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const book = {
    name : "",
    author : "",
    price : 0,
    rating : 0
};

describe("Rendering of Book Form", ()=>{
    let form;
    
    const notify = jest.fn();
    const handleSubmit = jest.fn();

    beforeAll(() => (form = shallow( 
    <BookForm  book={book} type="" handleSubmit={handleSubmit} notify={notify}/> 
    )))

    it("Should render book name field",()=>{
        const nameField = form.find('Book Name');
        expect(nameField).toBeDefined();
    })

    it("Should render author field",()=>{
        const authorField = form.find('Author');
        expect(authorField).toBeDefined();
    })

    it("Should render price field",()=>{
        const priceField = form.find('Price');
        expect(priceField).toBeDefined();
    })

    it("Should render rating field",()=>{
        const ratingField = form.find('Rating');
        expect(ratingField).toBeDefined();
    })

    // it("Should call handle submit function",()=>{
    //     const submitBtn = form.find('#submit')
    //     submitBtn.simulate('click', {preventDefault: () => {}})
    //     expect(handleSubmit).toHaveBeenCalled();
    // })
    
})