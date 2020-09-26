import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils'
import TableRow from './components/tableRow'


// beforeEach(() => {
//   console.log("Tests started .")
//   let container = document.createElement('div')
//   document.appendChild(container)
// })
let container = document.createElement('div')
  document.body.appendChild(container)

it("table row will contain inner data", () => {
  act(() => {
    render(<TableRow data={{"ccy":"USD","base_ccy":"UAH","buy":"28.00000","sale":"28.41000"}} />, container)
  })
  expect(container.textContent).toBe("USD/UAH28.0000028.41000");
})


// afterEach(() => {
//   console.log("Testing complited ")
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// })

// let a = 9;
// let b = 2

// function sum(a,b){
//   return a+b
// }

// beforeEach(() => {
// a++
// b++
// });

// describe("first test ",()=>{
//   test(" 2 + 2 is 4 ",()=>{
//     expect(sum(a,b)).toBe(13)
//   }),
//   test(" second test ",()=>{
//     expect(sum(a,b)).toBe(15)
//   }),
//   it("sum 3+3 greater than 5",()=>{
//     expect(sum(a,b)).toBeGreaterThan(a+b-1)
//   })
// })