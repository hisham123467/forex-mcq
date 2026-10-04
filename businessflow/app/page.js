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
        <div className="kicker">BUSINESS SOFTWARE FOR LOCAL BUSINESSES</div>
        <h1>Your business.<br/>Booked online.</h1>
        <p>BusinessFlow gives salons, barbers, gyms, marts and service businesses the tools to manage customers, bookings, memberships, payments and daily operations from one simple system.</p>
        <div className="heroActions">
          <a className="btn" href="#contact">Get BusinessFlow</a>
          <a className="btn light" href="#product">See what you get</a>
        </div>
        <div className="trustLine"><span>Online bookings</span><span>Membership tracking</span><span>Mobile ready</span></div>
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
      <div className="wrap industries"><span>Built for</span><b>BARBERS</b><b>SALONS</b><b>GYMS</b><b>CLINICS</b><b>MARTS</b><b>WORKSHOPS</b><b>CONSULTANTS</b></div>
    </section>

    <section id="product" className="section wrap">
      <div className="sectionHead"><div className="kicker">THE PRODUCT</div><h2>One system for bookings, memberships and retail operations.</h2><p>No complicated software. No clutter. BusinessFlow adapts to the type of local business you run.</p></div>
      <div className="featureGrid">
        <article><div className="featureIcon">01</div><h3>Branded booking page</h3><p>Your own clean customer-facing page with services, prices, timing and booking.</p></article>
        <article><div className="featureIcon">02</div><h3>Owner dashboard</h3><p>See bookings, customers and expected revenue from one simple dashboard.</p></article>
        <article><div className="featureIcon">03</div><h3>Customer records</h3><p>Keep client details and booking history organised automatically.</p></article>
        <article><div className="featureIcon">04</div><h3>Services & pricing</h3><p>Manage services, duration and pricing without rebuilding the website.</p></article>
        <article><div className="featureIcon">05</div><h3>WhatsApp friendly</h3><p>Share one clean link on WhatsApp, Instagram and Google Business Profile.</p></article>
        <article><div className="featureIcon">06</div><h3>Membership & renewals</h3><p>For gyms, track members, monthly fees, renewal dates and payment status from one place.</p></article>
      </div>
    </section>


    <section className="gymSection">
      <div className="wrap gymGrid">
        <div className="gymCopy">
          <div className="kicker">BUSINESSFLOW FOR GYMS</div>
          <h2>Know who paid. Know who needs to renew.</h2>
          <p>Gym owners get a dedicated membership view to track active members, monthly payments, overdue renewals and expected membership revenue.</p>
          <div className="gymChecks"><span>Member database</span><span>Paid / unpaid status</span><span>Monthly renewal dates</span><span>Payment history</span></div>
          <a className="btn" href="/demo-gym">View gym demo →</a>
        </div>
        <div className="gymPreview">
          <div className="gymPreviewTop"><div><small>IRON HOUSE FITNESS</small><b>Membership overview</b></div><span>October</span></div>
          <div className="gymMetrics">
            <div><small>Total members</small><b>146</b><span>+8 this month</span></div>
            <div><small>Paid</small><b>112</b><span>76.7% collected</span></div>
            <div><small>Renewals due</small><b>19</b><span>Next 7 days</span></div>
          </div>
          <div className="gymMiniTable">
            <div className="gymMiniHead"><span>Member</span><span>Renewal</span><span>Status</span></div>
            {[
              ['Ahmed Raza','08 Oct','Paid'],
              ['Saad Khan','09 Oct','Due'],
              ['Hamza Ali','11 Oct','Paid'],
              ['Usman Tariq','12 Oct','Due']
            ].map(x=><div className="gymMiniRow" key={x[0]}><span><b>{x[0]}</b><small>Monthly</small></span><span>{x[1]}</span><em className={x[2]==='Paid'?'paid':'due'}>{x[2]}</em></div>)}
          </div>
        </div>
      </div>
    </section>


    <section className="retailSection">
      <div className="wrap retailGrid">
        <div className="retailPreview">
          <div className="retailPreviewTop"><div><small>CITY MART</small><b>Retail overview</b></div><span>Live</span></div>
          <div className="retailMetrics">
            <div><small>Today sales</small><b>Rs 185k</b><span>247 bills</span></div>
            <div><small>Low stock</small><b>17</b><span>Needs reorder</span></div>
            <div><small>Suppliers due</small><b>Rs 73k</b><span>4 suppliers</span></div>
          </div>
          <div className="retailMiniTable">
            <div className="retailMiniHead"><span>Product</span><span>Stock</span><span>Status</span></div>
            {[
              ['Milk 1L','8','Low'],
              ['Cooking Oil 5L','42','Good'],
              ['Rice 5kg','5','Low'],
              ['Shampoo 360ml','31','Good']
            ].map(x=><div className="retailMiniRow" key={x[0]}><span><b>{x[0]}</b><small>Inventory item</small></span><span>{x[1]}</span><em className={x[2]==='Good'?'good':'low'}>{x[2]}</em></div>)}
          </div>
        </div>
        <div className="retailCopy">
          <div className="kicker">BUSINESSFLOW FOR RETAIL</div>
          <h2>Sales, stock and suppliers in one dashboard.</h2>
          <p>For marts, mini supermarkets and grocery stores: track products, stock levels, low-stock items, supplier balances and daily sales without relying on paper registers.</p>
          <div className="retailChecks"><span>POS-ready product catalog</span><span>Stock & low-stock alerts</span><span>Supplier tracking</span><span>Daily sales overview</span></div>
          <a className="btn" href="/demo-retail">View retail demo →</a>
        </div>
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
        <article><small>STARTER</small><h3>Rs 1,499<span>/month</span></h3><p>For an independent salon, barber, gym, mart or service business.</p><ul><li>Professional booking page</li><li>Unlimited bookings</li><li>Customer dashboard</li><li>Services & prices</li><li>Mobile access</li></ul><a className="btn light full" href="#contact">Get Starter</a></article>
        <article className="priceFeatured"><div className="recommended">POPULAR</div><small>PRO</small><h3>Rs 2,999<span>/month</span></h3><p>For businesses that need more control and staff support.</p><ul><li>Everything in Starter</li><li>Multiple staff</li><li>Advanced reporting</li><li>Priority support</li><li>Growth features</li></ul><a className="btn full" href="#contact">Get Pro</a></article>
      </div>
    </section>

    <section id="contact" className="contactSection">
      <div className="wrap contactBox">
        <div><div className="kicker">GET STARTED</div><h2>Ready to take bookings online?</h2><p>Send your business details on WhatsApp. We prepare the page, send it to you for review, and activate it after payment.</p></div>
        <div className="contactCard"><b>What we need</b><span>Business name</span><span>Logo or profile photo</span><span>Services & prices</span><span>Opening hours</span><span>Address & WhatsApp number</span><p>Payment is handled directly through JazzCash on WhatsApp.</p></div>
      </div>
    </section>

    <footer><div className="wrap footerIn"><a className="brand" href="/"><span>B</span>BusinessFlow</a><p>Business software for local businesses.</p><small>© 2026 BusinessFlow</small></div></footer>
  </main>
}
