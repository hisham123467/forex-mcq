'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const services=[
  {name:'Classic Haircut',price:1200,duration:'35 min'},
  {name:'Beard Trim & Shape',price:700,duration:'20 min'},
  {name:'Haircut + Beard',price:1700,duration:'50 min'},
  {name:'Haircut + Facial',price:2400,duration:'70 min'}
]
const seed=[
  {id:'a',time:'3:00 PM',name:'Hamza Khan',service:'Classic Haircut',price:1200,status:'Confirmed'},
  {id:'b',time:'4:00 PM',name:'Sameer Ali',service:'Beard Trim & Shape',price:700,status:'Confirmed'},
  {id:'c',time:'5:30 PM',name:'Ali Raza',service:'Haircut + Facial',price:2400,status:'Confirmed'}
]

export default function Home(){
  const [view,setView]=useState('home')
  const [bookings,setBookings]=useState(seed)
  const [service,setService]=useState(0)
  const [date,setDate]=useState('')
  const [time,setTime]=useState('')
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [done,setDone]=useState(false)
  const [business,setBusiness]=useState({name:'',category:'Barber / Salon',city:'Karachi',phone:''})

  useEffect(()=>{try{const x=JSON.parse(localStorage.getItem('bf_bookings')||'[]');if(x.length)setBookings([...x,...seed])}catch{}},[])
  const revenue=useMemo(()=>bookings.reduce((n,b)=>n+Number(b.price||0),0),[bookings])

  async function book(e){
    e.preventDefault()
    if(!date||!time||!name||!phone)return
    const b={id:crypto.randomUUID(),time,name,phone,service:services[service].name,price:services[service].price,status:'Confirmed',date}
    const local=[b,...(JSON.parse(localStorage.getItem('bf_bookings')||'[]'))]
    localStorage.setItem('bf_bookings',JSON.stringify(local))
    setBookings([b,...bookings]);setDone(true)
    try{
      const url=process.env.NEXT_PUBLIC_SUPABASE_URL
      const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      if(url&&key){
        const supabase=createClient(url,key)
        await supabase.from('bookings').insert({
          business_id:'11111111-1111-4111-8111-111111111111',
          service_name:services[service].name,
          price:services[service].price,
          booking_date:date,
          booking_time:time,
          customer_name:name,
          customer_phone:phone,
          status:'confirmed'
        })
      }
    }catch{}
  }
  function createBusiness(e){
    e.preventDefault()
    localStorage.setItem('bf_business',JSON.stringify(business))
    setView('dashboard')
  }

  return <main>
    <header className="nav">
      <button className="brand" onClick={()=>setView('home')}><span>B</span>BusinessFlow</button>
      <nav><button onClick={()=>setView('home')}>Home</button><button onClick={()=>setView('demo')}>Live demo</button><button onClick={()=>setView('pricing')}>Pricing</button></nav>
      <div className="navActions"><button className="textBtn" onClick={()=>setView('dashboard')}>Dashboard</button><button className="btn small" onClick={()=>setView('start')}>Start free</button></div>
    </header>

    {view==='home' && <>
      <section className="hero wrap">
        <div>
          <div className="eyebrow">BUILT FOR LOCAL BUSINESSES</div>
          <h1>More bookings.<br/><em>Less admin.</em></h1>
          <p>Give your salon, barber shop, clinic or service business a professional booking page, customer list and daily dashboard — without complicated software.</p>
          <div className="heroBtns"><button className="btn" onClick={()=>setView('start')}>Create my business page</button><button className="btn ghost" onClick={()=>setView('demo')}>See customer demo</button></div>
          <div className="checks"><span>✓ No card required</span><span>✓ Mobile friendly</span><span>✓ Setup in minutes</span></div>
        </div>
        <DashboardPreview bookings={bookings} revenue={revenue}/>
      </section>
      <section className="strip"><div className="wrap stripIn"><span>Perfect for</span><b>BARBERS</b><b>SALONS</b><b>CLINICS</b><b>WORKSHOPS</b><b>CONSULTANTS</b></div></section>
      <section className="section wrap">
        <div className="eyebrow">EVERYDAY TOOLS</div><h2>Everything a small service business actually needs.</h2>
        <div className="features">{[
          ['↗','Online booking','Customers can reserve a service and time from one simple link.'],
          ['◎','Customer list','Keep client names, visits and booking history organised.'],
          ['◉','WhatsApp ready','Make it easy for customers to contact you from the same page.'],
          ['▦','Owner dashboard','See bookings, customers and expected revenue at a glance.'],
          ['◇','Mobile first','Manage the business from your phone, not a complicated desktop tool.'],
          ['⌁','Shareable page','Use your link on Instagram, Google Maps and WhatsApp.']
        ].map(x=><article key={x[1]}><i>{x[0]}</i><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
      </section>
      <section className="dark"><div className="wrap darkIn"><div><div className="eyebrow lime">LIVE CUSTOMER FLOW</div><h2>Try the exact page your clients will use.</h2><p>Pick a service, date and time. The booking instantly appears in the demo dashboard.</p></div><button className="btn limeBtn" onClick={()=>setView('demo')}>Open live demo →</button></div></section>
      <Pricing onStart={()=>setView('start')}/>
    </>}

    {view==='demo' && <section className="demoPage">
      <div className="demoCover"><button className="back" onClick={()=>setView('home')}>← BusinessFlow</button><div className="coverInfo"><div className="logo">RC</div><div><small>● OPEN TODAY</small><h1>Royal Cuts</h1><p>Premium barbering in Karachi · Men’s grooming</p></div></div></div>
      <div className="demoGrid wrap">
        <div className="businessInfo"><div className="rating">★★★★★ <b>4.9</b> <span>128 reviews</span></div><h2>Look sharp. Feel confident.</h2><p>Modern cuts, precise beard work and grooming in a relaxed studio. Choose your service and reserve a time.</p><div className="info">⌖ <span><b>Bahria Town Karachi</b><small>Precinct 10-A, Karachi</small></span></div><div className="info">◷ <span><b>Mon–Sun</b><small>11:00 AM – 10:00 PM</small></span></div><button className="whatsapp">WhatsApp us</button></div>
        <div className="bookingCard">
          {!done?<form onSubmit={book}><small className="green">BOOK APPOINTMENT</small><h2>Pick a service & time</h2><label>Choose a service</label><div className="serviceList">{services.map((s,i)=><button type="button" className={service===i?'service active':'service'} key={s.name} onClick={()=>setService(i)}><span><b>{s.name}</b><small>{s.duration}</small></span><strong>Rs {s.price.toLocaleString()}</strong></button>)}</div><div className="fields"><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label><label>Time<select value={time} onChange={e=>setTime(e.target.value)} required><option value="">Select time</option>{['11:00 AM','12:30 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM','8:00 PM'].map(t=><option key={t}>{t}</option>)}</select></label></div><div className="fields"><label>Your name<input placeholder="e.g. Hisham" value={name} onChange={e=>setName(e.target.value)} required/></label><label>Phone / WhatsApp<input placeholder="03xx xxxxxxx" value={phone} onChange={e=>setPhone(e.target.value)} required/></label></div><button className="btn full">Confirm booking — Rs {services[service].price.toLocaleString()}</button><p className="note">Demo only — no payment is charged.</p></form>:
          <div className="success"><div>✓</div><h2>Booking confirmed</h2><p>Your appointment at Royal Cuts is booked for <b>{date}</b> at <b>{time}</b>.</p><button className="btn full" onClick={()=>{setDone(false);setName('');setPhone('');setTime('')}}>Book another</button><button className="btn ghost full" onClick={()=>setView('dashboard')}>View in dashboard</button></div>}
        </div>
      </div>
    </section>}

    {view==='dashboard' && <Dashboard bookings={bookings} revenue={revenue} onDemo={()=>setView('demo')}/>}
    {view==='pricing' && <Pricing onStart={()=>setView('start')} standalone/>}
    {view==='start' && <section className="startPage"><form className="startCard" onSubmit={createBusiness}><button type="button" className="brand centerBrand" onClick={()=>setView('home')}><span>B</span>BusinessFlow</button><div className="eyebrow">START FREE</div><h1>Create your business page</h1><p>Fill in the basics. You can change everything later.</p><label>Business name<input value={business.name} onChange={e=>setBusiness({...business,name:e.target.value})} placeholder="e.g. Royal Cuts" required/></label><label>Business type<select value={business.category} onChange={e=>setBusiness({...business,category:e.target.value})}><option>Barber / Salon</option><option>Clinic</option><option>Car workshop</option><option>Consultant</option><option>Other service business</option></select></label><label>City<input value={business.city} onChange={e=>setBusiness({...business,city:e.target.value})}/></label><label>WhatsApp number<input value={business.phone} onChange={e=>setBusiness({...business,phone:e.target.value})} placeholder="+92 3xx xxxxxxx"/></label><button className="btn full">Create my dashboard</button><small className="note">This launch build saves demo data in your browser.</small></form></section>}
  </main>
}

function DashboardPreview({bookings,revenue}){return <div className="preview"><div className="browser"><i></i><i></i><i></i><span>businessflow.app/dashboard</span></div><div className="previewBody"><div className="pHead"><div><small>GOOD MORNING</small><h3>Royal Cuts</h3></div><div className="round">RC</div></div><div className="metrics"><div><span>Today</span><b>{bookings.length}</b><small>appointments</small></div><div><span>Expected</span><b>Rs {Math.round(revenue/100)/10}k</b><small>revenue</small></div><div><span>New</span><b>3</b><small>customers</small></div></div><div className="schedule"><div className="scheduleTitle"><b>Today’s schedule</b><span>View all</span></div>{bookings.slice(0,3).map(b=><div className="row" key={b.id}><time>{b.time}</time><span><b>{b.name}</b><small>{b.service}</small></span><em>Confirmed</em></div>)}</div></div></div>}

function Dashboard({bookings,revenue,onDemo}){return <section className="dash"><aside><div className="brand white"><span>B</span>BusinessFlow</div><div className="switch"><div className="round">RC</div><span><b>Royal Cuts</b><small>Starter plan</small></span></div><nav><button className="active">▦ Overview</button><button>◷ Bookings</button><button>◎ Customers</button><button>◇ Services</button><button>⚙ Settings</button></nav><button className="public" onClick={onDemo}>↗ View booking page</button></aside><div className="dashMain"><div className="dashTop"><div><small>ROYAL CUTS</small><h1>Overview</h1></div><button className="btn small" onClick={onDemo}>+ New booking</button></div><div className="dashMetrics"><div><span>Today’s bookings</span><b>{bookings.length}</b><small>Live demo data</small></div><div><span>Expected revenue</span><b>Rs {revenue.toLocaleString()}</b><small>Current list</small></div><div><span>Customers</span><b>{new Set(bookings.map(b=>b.name)).size}</b><small>Unique clients</small></div><div><span>Booking page</span><b className="online">Online</b><small>Accepting bookings</small></div></div><div className="tableCard"><div className="tableTitle"><h2>Today’s appointments</h2><button onClick={onDemo}>Open booking page ↗</button></div><div className="tableWrap"><table><thead><tr><th>Time</th><th>Customer</th><th>Service</th><th>Amount</th><th>Status</th></tr></thead><tbody>{bookings.map(b=><tr key={b.id}><td><b>{b.time}</b></td><td>{b.name}</td><td>{b.service}</td><td>Rs {Number(b.price).toLocaleString()}</td><td><em>{b.status}</em></td></tr>)}</tbody></table></div></div></div></section>}

function Pricing({onStart,standalone=false}){return <section className={standalone?'pricingPage wrap':'section wrap'}>{standalone&&<button className="brand centerBrand" onClick={()=>location.reload()}><span>B</span>BusinessFlow</button>}<div className="eyebrow">SIMPLE PRICING</div><h2>Start free. Upgrade when it makes you money.</h2><div className="plans"><article><span>Free</span><h3>Rs 0</h3><p>For trying your business page.</p><ul><li>Public business page</li><li>10 bookings / month</li><li>WhatsApp button</li></ul><button className="btn ghost full" onClick={onStart}>Start free</button></article><article className="featured"><div className="popular">MOST POPULAR</div><span>Starter</span><h3>Rs 1,499<small>/month</small></h3><p>For working local businesses.</p><ul><li>Unlimited bookings</li><li>Customer dashboard</li><li>Services & staff</li><li>Basic reports</li></ul><button className="btn full" onClick={onStart}>Choose Starter</button></article><article><span>Pro</span><h3>Rs 2,999<small>/month</small></h3><p>For businesses ready to grow.</p><ul><li>Everything in Starter</li><li>WhatsApp reminders</li><li>Multiple staff</li><li>Advanced reports</li></ul><button className="btn ghost full" onClick={onStart}>Choose Pro</button></article></div></section>}
