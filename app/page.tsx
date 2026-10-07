"use client";

import { useEffect, useMemo, useState } from "react";
import { dealerConfig, vehicleWhatsAppUrl } from "../lib/dealer-config";

type Car = {
  name: string;
  source: string;
  year: string;
  km: string;
  fuel: string;
  price: string;
  type: string;
  img: string;
};

const cars: Car[] = [
  {name:"Mercedes-Benz GLE 400d 4Matic Coupe",source:"https://www.autotrader.co.zw/cars/for-sale/harare/mercedes-benz/gle/wm094",year:"2023",km:"18,000 KM",fuel:"Diesel",type:"Luxury",price:"US$115,000",img:"https://upload.wikimedia.org/wikipedia/commons/d/df/2023_Mercedes-Benz_GLE_400d_3.0_front.jpg"},
  {name:"Mercedes-Benz GLE 450",source:"",year:"2024",km:"32,000 KM",fuel:"Petrol",type:"Luxury",price:"US$89,500",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz%20GLE%20450%204MATIC%20AMG%20Line%20W167%20Black%20%284%29.jpg"},
  {name:"Toyota Hilux KingCab",source:"https://www.autotrader.co.zw/cars/for-sale/harare/toyota/aqua/wm022",year:"2021",km:"34,000 KM",fuel:"Diesel",type:"4x4",price:"US$38,000",img:"https://cdn.ennxo.com/uploads/products/640/042208aa53854925bb2bbc5849ed13e6.jpg"},
  {name:"Nissan Caravan Premium GX",source:"https://www.autotrader.co.zw/cars/for-sale/harare/nissan/note/wm077",year:"2017",km:"108,000 KM",fuel:"Diesel",type:"MPV",price:"US$17,900",img:"https://upload.wikimedia.org/wikipedia/commons/1/14/Nissan_NV350_CARAVAN_PREMIUM_GX_%28E26%29_front.JPG"},
  {name:"BMW X1 xDrive",source:"https://www.autotrader.co.zw/cars/for-sale/harare/toyota/hilux-gd6/wm057",year:"2017",km:"85,000 KM",fuel:"Diesel",type:"SUV",price:"US$18,800",img:"https://images.clickdealer.co.uk/vehicles/4513/4513535/large2/102053043.jpg"},
  {name:"Toyota Axio",source:"https://www.autotrader.co.zw/cars/for-sale/harare/hino/dutro/wm020",year:"2014",km:"127,000 KM",fuel:"Petrol",type:"Sedan",price:"US$8,400",img:"https://app.autofortrade.com/catalog/products/TOYOTA-AXIO-2896.jpg?height=900&width=1200"},
  {name:"Mercedes-Benz GLE 350d Coupe",source:"https://www.autotrader.co.zw/cars/for-sale/harare/mercedes-benz/gle/wm060",year:"2017",km:"120,000 KM",fuel:"Diesel",type:"Luxury",price:"US$37,800",img:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Mercedes_Benz_GLE_350d_Coupe_2016_%2842027117215%29.jpg"}
];

const heroCars = [
  {car: cars[4], eyebrow:"01 / BMW X1 xDrive"},
  {car: cars[6], eyebrow:"02 / Mercedes-Benz GLE 350d Coupe"},
  {car: cars[0], eyebrow:"03 / Mercedes-Benz GLE 400d 4Matic Coupe"}
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [selected, setSelected] = useState<Car | null>(null);
  const [filter, setFilter] = useState("All Vehicles");
  const [budget, setBudget] = useState("Any budget");
  const [bodyType, setBodyType] = useState("Any body type");
  const [make, setMake] = useState("Any make");

  useEffect(() => {
    heroCars.forEach(({car}) => { const img = new Image(); img.src = car.img; });
    const timer = window.setInterval(() => setSlide(s => (s + 1) % heroCars.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleCars = useMemo(() => {
    let result = filter === "All Vehicles"
      ? cars
      : filter === "Under US$60k"
        ? cars.filter(c => Number(c.price.replace(/[^0-9]/g, "")) < 60000)
        : cars.filter(c => c.type === filter);

    if (budget !== "Any budget") {
      result = result.filter(c => {
        const price = Number(c.price.replace(/[^0-9]/g, ""));
        if (budget === "Under US$60k") return price < 60000;
        if (budget === "US$60k — US$100k") return price >= 60000 && price <= 100000;
        if (budget === "US$100k+") return price > 100000;
        return true;
      });
    }
    if (bodyType !== "Any body type") result = result.filter(c => c.type === bodyType);
    if (make !== "Any make") result = result.filter(c => c.name.toLowerCase().startsWith(make.toLowerCase()));
    return result;
  }, [filter, budget, bodyType, make]);

  const activeHero = heroCars[slide];

  return <main>
    <nav className="nav"><div className="container navInner">
      <a className="brand" href="#top">{dealerConfig.name}</a>
      <div className="links"><a href="#stock">Stock</a><a href="#experience">Experience</a><a href="#sourcing">Sourcing</a><a href="#contact">Contact</a></div>
      <a className="navCta" href="#stock">View Collection</a>
    </div></nav>
    <div className="demoStrip">DEMO WEBSITE · HISTORICAL WAMAMBO LISTINGS · REPRESENTATIVE MODEL PHOTOS · LIVE STOCK WILL REPLACE THESE</div>

    <section className="hero" id="top">
      {heroCars.map((item, i) => <button key={item.car.name} className={`heroSlide ${i === slide ? "active" : ""}`} onClick={() => setSelected(item.car)} aria-label={`View ${item.car.name}`}>
        <span className="heroImage" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.74),rgba(0,0,0,.18) 55%,rgba(0,0,0,.3)),url('${item.car.img}')`}} />
      </button>)}
      <div className="container heroContent">
        <div className="eyebrow">{dealerConfig.location} · Wamambo Motors ZW</div>
        <div className="heroVehicle">{activeHero.eyebrow}</div>
        <h1>Drive<br/>Different.</h1>
        <p>A sharper digital showroom for premium vehicle discovery. Explore a curated Wamambo Motors ZW demo collection, built around clarity, confidence and direct enquiries.</p>
        <div className="buttons"><a className="btn btnLight" href="#stock">Explore Collection</a><a className="btn btnGhost" href={dealerConfig.whatsappNumber ? `https://wa.me/${dealerConfig.whatsappNumber}` : "#contact"} target={dealerConfig.whatsappNumber ? "_blank" : undefined} rel={dealerConfig.whatsappNumber ? "noreferrer" : undefined}>Speak to Sales</a></div>
      </div>
      <div className="heroControls">
        <button className="heroArrow" onClick={() => setSlide((slide - 1 + heroCars.length) % heroCars.length)} aria-label="Previous vehicle">←</button>
        {heroCars.map((item, i) => <button key={item.car.name} className={`heroDot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} aria-label={`Show vehicle ${i + 1}`} />)}
        <button className="heroArrow" onClick={() => setSlide((slide + 1) % heroCars.length)} aria-label="Next vehicle">→</button>
      </div>
      <div className="heroMeta"><div className="container heroMetaInner"><div className="slideCount"><b>{String(slide + 1).padStart(2,"0")}</b> / {String(heroCars.length).padStart(2,"0")}</div><div className="heroNote">Historical listing · representative model photo</div></div></div>
    </section>

    <section className="section" id="stock"><div className="container">
      <div className="sectionHead"><div><div className="kicker">The collection</div><h2>Selected.<br/>Not crowded.</h2></div><p className="sectionIntro">A demonstration collection based on Wamambo Motors ZW vehicle listings published on AutoTrader. These are historical examples and can be replaced with live stock if the dealership proceeds.</p></div>
      <div className="filters">{["All Vehicles","SUV","Luxury","4x4","Under US$60k"].map(f => <button key={f} className={`filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="grid">{visibleCars.map(c=><button className="car" key={c.name} onClick={() => setSelected(c)} aria-label={`View ${c.name}`}>
        <div className="carImg" style={{backgroundImage:`url('${c.img}')`}}/><div className="carBody"><div className="carTop"><h3>{c.name}</h3><div className="price">{c.price}</div></div><div className="spec"><span>{c.year}</span><span>{c.km}</span><span>{c.fuel}</span></div><span className="view">View vehicle →</span>{c.source && <a className="sourceLink" href={c.source} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>Original Wamambo listing →</a>}</div>
      </button>)}</div>
    </div>{visibleCars.length === 0 && <div className="emptyState">No vehicles match those criteria. Adjust the filters or <button type="button" onClick={() => {setFilter("All Vehicles");setBudget("Any budget");setBodyType("Any body type");setMake("Any make");}}>reset your search</button>.</div>}</section>

    <section className="manifesto" id="experience"><div className="container"><div className="kicker">The Wamambo experience</div><h2>Make every enquiry feel premium.</h2><p>From the first image to the first conversation, every touchpoint is designed around clarity, confidence and a faster path to the right vehicle.</p><div className="featureGrid">
      <a className="feature" href="#stock"><small>01 / SEARCH</small><strong>Find your next car without the noise.</strong></a>
      <a className="feature" href="#contact"><small>02 / WHATSAPP</small><strong>Talk directly to a sales specialist.</strong></a>
      <a className="feature" href="#sourcing"><small>03 / SOURCE</small><strong>Can't find it? We'll source it.</strong></a>
      <a className="feature" href="#contact"><small>04 / VIEW</small><strong>Book a private viewing in Harare.</strong></a>
    </div></div></section>

    <section className="section finder" id="sourcing"><div className="container"><div className="kicker">Find your match</div><h2>Tell us what<br/>you're looking for.</h2><div className="finderBox">
      <label className="field"><span>Budget</span><select value={budget} onChange={e => setBudget(e.target.value)}><option>Any budget</option><option>Under US$60k</option><option>US$60k — US$100k</option><option>US$100k+</option></select></label>
      <label className="field"><span>Body type</span><select value={bodyType} onChange={e => setBodyType(e.target.value)}><option>Any body type</option><option>SUV</option><option>Luxury</option><option>4x4</option></select></label>
      <label className="field"><span>Make</span><select value={make} onChange={e => setMake(e.target.value)}><option>Any make</option><option>Mercedes-Benz</option><option>Range Rover</option><option>BMW</option><option>Toyota</option><option>Porsche</option><option>Ford</option></select></label>
      <button className="finderBtn" type="button" onClick={() => { setFilter("All Vehicles"); window.location.hash = "stock"; }}>Show my matches →</button>
    </div></div></section>

    <footer className="footer" id="contact"><div className="container footerGrid"><div><a className="brand" href="#top">WAMAMBO MOTORS ZW</a><p>A premium digital showroom concept for Wamambo Motors ZW. Historical listings are used for demonstration and can be replaced with current inventory.</p></div><div className="footerLinks"><a href="#stock">Stock</a><a href="#sourcing">Source a Car</a><a href={dealerConfig.whatsappNumber ? `https://wa.me/${dealerConfig.whatsappNumber}` : "#contact"} target={dealerConfig.whatsappNumber ? "_blank" : undefined} rel={dealerConfig.whatsappNumber ? "noreferrer" : undefined}>WhatsApp Sales</a>{dealerConfig.salesEmail && <a href={`mailto:${dealerConfig.salesEmail}`}>Email Sales</a>}</div></div></footer>

    {selected && <div className="modalBackdrop" onClick={() => setSelected(null)}><div className="vehicleModal" onClick={e => e.stopPropagation()}>
      <button className="modalClose" onClick={() => setSelected(null)} aria-label="Close">×</button>
      <div className="modalImage" style={{backgroundImage:`url('${selected.img}')`}} />
      <div className="modalBody"><div className="kicker">Historical Wamambo listing</div><h2>{selected.name}</h2><div className="modalPrice">{selected.price}</div><div className="modalSpecs"><span>{selected.year}</span><span>{selected.km}</span><span>{selected.fuel}</span><span>{selected.type}</span></div><p>This vehicle is shown as a historical Wamambo Motors ZW example. The listing is no longer current; live stock would replace it on a production website.</p>{selected.source && <a className="btn btnOutline" href={selected.source} target="_blank" rel="noreferrer">View original listing →</a>}<div className="modalActions"><a className="btn btnDark" href={vehicleWhatsAppUrl(selected.name, selected.price)} target="_blank" rel="noreferrer" onClick={() => setSelected(null)}>Enquire on WhatsApp →</a><button className="btn btnOutline" onClick={() => setSelected(null)}>Close preview</button></div></div>
    </div></div>}
  </main>;
}
