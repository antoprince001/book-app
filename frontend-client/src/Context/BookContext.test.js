import { BookContext, BookContextProvider } from './BookContext';

describe('Test Book Context', ()=>{

  it('Context should be defined',()=>{
    expect(<BookContext />).toBeDefined();
  });

  it('Context Provider be defined',()=>{
    expect(<BookContextProvider />).toBeDefined();
  });

})