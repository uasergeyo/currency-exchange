import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils'
import TableRow from './components/tableRow'
const fetch = require("node-fetch");
import { actionEditCell, actionGetCurrencies } from './store/actionCreators'
import store from './store/store'


let container = null;

beforeEach(() => {
  container = document.createElement('tbody')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})


it("table row will contain inner data", () => {
  let randomData = { "ccy": Math.random(), "base_ccy": Math.random(), "buy": Math.random(), "sale": Math.random() }
  act(() => {
    render(<TableRow data={randomData} />, container)
    expect(container.textContent).toBe(`${randomData.ccy}/${randomData.base_ccy}${randomData.buy}${randomData.sale}`);

  })
})

test("table row will contain that we passed in props", () => {
  render(<TableRow data={{ "ccy": "EUR", "base_ccy": "UAH", "buy": "32.50000", "sale": "33.12000" }} />, container)
  expect(container.textContent).not.toBe("eur/uah32.5003312000")
})

test("fetch resolves array.length === 4", () => {
  fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
    .then(res => res.json())
    .then(data => expect(data.length).toBeGreaterThan(0))
})

test("redux action actionEditCell() changes state", () => {
  let credentials = "###747"
  store.dispatch(actionEditCell(credentials))
  expect(store.getState().changeCurrencyPosition.lastChange).toBe(credentials)
})

test("actionGetCurrencies() will change state", async () => {
  /* for working test you have to add 
  "const fetch = require("node-fetch");" 
  into: "./store/actionCreators/promiseActions/actionPromiseGetCurrencies "
  */
  await store.dispatch(actionGetCurrencies())
  expect(store.getState().promiseReducer.currenciesAPI.payload.length).toBeGreaterThan(0)
})

test("every fifth fetching data we get Error message", async() => {
  let i = 0;
  while (i < 11) {
    i++;
    console.log(localStorage.requestCounter !=4 ?'\x1b[33m%s\x1b[0m':"\x1b[41m",localStorage.requestCounter !=4 ? " ----------  RESOLVED --------- " : "----------- REJECTED ------------")
    await store.dispatch(actionGetCurrencies())
    if(store.getState().promiseReducer.status && store.getState().promiseReducer.status !== "PENDING"){
      if(localStorage.requestCounter != 4){
        expect(store.getState().promiseReducer.status).toBe("RESOLVED")
      }else{
        expect(store.getState().promiseReducer.status).toBe("REJECTED")
      }
    }
  }
})
