'use client'
import { useState } from 'react'

export default function Home(){
  const [menu,setMenu]=useState(false)
  return <main className="site">
    <header className="topbar">
      <a className="brand" href="/"><span>B</span>BusinessFlow</a>
      <nav className={menu?'navLinks open':'navLinks'}>
        <a href="#product">Product</a>
        <a href="#workflow">How it works</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="menuBtn" onClick={()=>setMenu(!menu)} aria-label="Menu">☰</button>
    </header>

    <section className="heroReal wrap">
      <div className="heroCopy">
        <div className="kicker">BOOKING SOFTWARE FOR LOCAL BUSINESSES</div>
        <h1>Your business.<br/>Booked online.</h1>
        <p>BusinessFlow gives salons, barbers and service businesses a professional booking page, customer records and an owner dashboard — all in one simple system.</p>
        <div className="heroActions">
          <a className="btn" href="#contact">Get BusinessFlow</a>
          <a className="btn light" href="#product">See what you get</a>
        </div>
        <div className="trustLine"><span>Online bookings</span><span>Customer management</span><span>Mobile ready</span></div>
      </div>
      <div className="productShot">
        <div className="shotTop"><div className="shotLogo">RC</div><div><small>TODAY</small><strong>Royal Cuts</strong></div><span className="status">Online</span></div>
        <div className="stats">
          <div><small>Bookings</small><b>12</b><span>today</span></div>
          <div><small>Revenue</small><b>Rs 18.4k</b><span>expected</span></div>
          <div><small>Customers</small><b>9</b><span>unique</span></div>
        </div>
        <div className="apptCard">
          <div className="apptHead"><b>Today’s appointments</b><span>12 total</span></div>
          {[
            ['11:00 AM','Hamza Khan','Classic Haircut','Confirmed'],
            ['12:30 PM','Sameer Ali','Haircut + Beard','Confirmed'],
            ['2:00 PM','Ali Raza','Beard Trim','Confirmed'],
            ['3:30 PM','Daniyal Ahmed','Haircut + Facial','Confirmed']
          ].map(r=><div className="apptRow" key={r[0]}><time>{r[0]}</time><span><b>{r[1]}</b><small>{r[2]}</small></span><em>{r[3]}</em></div>)}
        </div>
      </div>
    </section>

    <section className="logoStrip">
      <div className="wrap industries"><span>Built for</span><b>BARBERS</b><b>SALONS</b><b>CLINICS</b><b>WORKSHOPS</b><b>CONSULTANTS</b></div>
    </section>

    <section id="product" className="section wrap">
      <div className="sectionHead"><div className="kicker">THE PRODUCT</div><h2>Everything needed to run bookings professionally.</h2><p>No complicated software. No clutter. Just the tools a local business uses every day.</p></div>
      <div className="featureGrid">
        <article><div className="featureIcon">01</div><h3>Branded booking page</h3><p>Your own clean customer-facing page with services, prices, timing and booking.</p></article>
        <article><div className="featureIcon">02</div><h3>Owner dashboard</h3><p>See bookings, customers and expected revenue from one simple dashboard.</p></article>
        <article><div className="featureIcon">03</div><h3>Customer records</h3><p>Keep client details and booking history organised automatically.</p></article>
        <article><div className="featureIcon">04</div><h3>Services & pricing</h3><p>Manage services, duration and pricing without rebuilding the website.</p></article>
        <article><div className="featureIcon">05</div><h3>WhatsApp friendly</h3><p>Share one clean link on WhatsApp, Instagram and Google Business Profile.</p></article>
        <article><div className="featureIcon">06</div><h3>Mobile first</h3><p>Both the business owner and customers can use it comfortably from a phone.</p></article>
      </div>
    </section>

    <section id="workflow" className="workflowSection">
      <div className="wrap workflowGrid">
        <div><div className="kicker">HOW IT WORKS</div><h2>We set it up. You start taking bookings.</h2></div>
        <div className="steps">
          <div><span>1</span><div><b>Business setup</b><p>Business name, services, prices, hours, logo and contact details are added.</p></div></div>
          <div><span>2</span><div><b>Your booking page goes live</b><p>You receive a shareable page made for your business.</p></div></div>
          <div><span>3</span><div><b>Customers book online</b><p>Customers choose a service, date and available time from their phone.</p></div></div>
          <div><span>4</span><div><b>You manage everything</b><p>Bookings and customer details appear in your private dashboard.</p></div></div>
        </div>
      </div>
    </section>

    <section id="pricing" className="section wrap">
      <div className="sectionHead centered"><div className="kicker">PRICING</div><h2>Simple plans for working businesses.</h2><p>Payment and activation are handled directly with us on WhatsApp.</p></div>
      <div className="priceGrid">
        <article><small>STARTER</small><h3>Rs 1,499<span>/month</span></h3><p>For an independent salon, barber or service business.</p><ul><li>Professional booking page</li><li>Unlimited bookings</li><li>Customer dashboard</li><li>Services & prices</li><li>Mobile access</li></ul><a className="btn light full" href="#contact">Get Starter</a></article>
        <article className="priceFeatured"><div className="recommended">POPULAR</div><small>PRO</small><h3>Rs 2,999<span>/month</span></h3><p>For businesses that need more control and staff support.</p><ul><li>Everything in Starter</li><li>Multiple staff</li><li>Advanced reporting</li><li>Priority support</li><li>Growth features</li></ul><a className="btn full" href="#contact">Get Pro</a></article>
      </div>
    </section>

    <section id="contact" className="contactSection">
      <div className="wrap contactBox">
        <div><div className="kicker">GET STARTED</div><h2>Ready to take bookings online?</h2><p>Send your business details on WhatsApp. We prepare the page, send it to you for review, and activate it after payment.</p></div>
        <div className="contactCard"><b>What we need</b><span>Business name</span><span>Logo or profile photo</span><span>Services & prices</span><span>Opening hours</span><span>Address & WhatsApp number</span><p>Payment is handled directly through JazzCash on WhatsApp.</p></div>
      </div>
    </section>

    <footer><div className="wrap footerIn"><a className="brand" href="/"><span>B</span>BusinessFlow</a><p>Booking software for local businesses.</p><small>© 2026 BusinessFlow</small></div></footer>
  </main>
}
