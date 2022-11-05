"use strict";

const copyRegion = [...regions];

//Dynamic options

function renderOptions() {
  copyRegion.forEach((item) => {
    copyRegion.sort();
    const option = createElement("option", "item-option", item);
    $("#region").appendChild(option);
  });
}

renderOptions();

// Send region name

$("#region").addEventListener("change", (e) => {
  e.preventDefault();
  localStorage.setItem("region", e.target.value);
  const cities = localStorage.getItem("region");
  $("#city").innerHTML = cities;

  switch (cities.toLowerCase()) {
    case "farg'ona":
      getData("qo'qon");
      break;
    case "qashqadaryo":
      getData("qarshi");
      break;
    case "surxondaryo":
      getData("termiz");
      break;
    case "xorazm":
      getData("urganch");
      break;
    case "sirdaryo":
      getData("guliston");
      break;
    case "qoraqalpog'iston":
      getData("nukus");
      break;
    // case "navoiy" : getData("navoiy"); break;
    // case "namangan" : getData("namangan"); break;
    // case "" : getData("qo'qon"); break;
    // case "farg'ona" : getData("qo'qon"); break;
    // case "farg'ona" : getData("qo'qon"); break;
    // case "farg'ona" : getData("qo'qon"); break;
    // case "farg'ona" : getData("qo'qon"); break;
    // case "farg'ona" : getData("qo'qon"); break;
    default:getData(cities);
  }
});

// Request API

async function getData(select) {
//Bugun uchun
    const today = await fetch(`https://islomapi.uz/api/present/day?region=${select}`);

    const todaysResult = await today.json();

//Haftalik
    const weekly = await fetch(`https://islomapi.uz/api/present/week?region=${select}`);

    const weekResult = await weekly.json();

    localStorage.setItem("data", JSON.stringify(todaysResult));
    localStorage.setItem("weekdata", JSON.stringify(weekResult));

  renderData();
//   console.log(todaysResult)
//   console.log(weekResult)
}

getData("toshkent")

// Render data

function renderData() {
    $("#tbody").innerHTML = "";
    const data = JSON.parse(localStorage.getItem("data"));
    const weekdata = JSON.parse(localStorage.getItem("weekdata"));

    const {region,date,times: {asr, hufton, peshin, quyosh,shom_iftor,tong_saharlik,}
    } = data;
    $("#city").innerHTML = region;
    $("#sana").innerHTML = date;

    $a(".card-time")[0].innerHTML = tong_saharlik;
    $a(".card-time")[1].innerHTML = quyosh;
    $a(".card-time")[2].innerHTML = peshin;
    $a(".card-time")[3].innerHTML = asr;
    $a(".card-time")[4].innerHTML = shom_iftor;
    $a(".card-time")[5].innerHTML = hufton;

    //week render

    const liveDay=new Date();
    console.log(liveDay.getDay())

    weekdata.forEach((item,index)=>{

        const tr = createElement("tr", `${(index + 1===liveDay.getDay())? "bg-success":""}`,`
        <td>${item.region}</td><td>${item.date.substring(0,10)}</td><td>${item.weekday}</td><td>${item.times.tong_saharlik}</td><td>${item.times.quyosh}</td><td>${item.times.peshin}</td><td>${item.times.asr}</td><td>${item.times.shom_iftor}</td><td>${item.times.hufton}</td>
        `)
       
        $("#tbody").appendChild(tr);
    })
}

renderData();

// Clock

function setClock(){
    setInterval(()=>{
        const date = new Date();
        $("#hour").innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },1000);
}

setClock()
