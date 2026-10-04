'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const services=[
  {name:'Classic Haircut',price:1200,duration:'35 min'},
  {name:'Beard Trim & Shape',price:700,duration:'20 min'},
  {name:'Haircut + Beard',price:1700,duration:'50 min'},
  {name:'Haircut + Facial',price:2400,duration:'70 min'}
]

export default function Demo(){
  const [service,setService]=useState(0)
  const [date,setDate]=useState('')
  const [time,setTime]=useState('')
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [done,setDone]=useState(false)

  async function book(e){
    e.preventDefault()
    if(!date||!time||!name||!phone)return
    setDone(true)
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

  return <main className="demoOnly">
    <div className="demoBadge">DEMO PREVIEW</div>
    <section className="salonHero">
      <div className="salonIdentity">
        <div className="salonMark">RC</div>
        <div><small>OPEN TODAY</small><h1>Royal Cuts</h1><p>Premium barbering · Karachi</p></div>
      </div>
    </section>
    <section className="salonGrid">
      <div className="salonInfo">
        <div className="rating">★★★★★ <b>4.9</b><span>128 reviews</span></div>
        <h2>Look sharp. Feel confident.</h2>
        <p>Modern cuts, precise beard work and grooming in a relaxed studio. Select a service and reserve a time that works for you.</p>
        <div className="detail">⌖ <span><b>Bahria Town Karachi</b><small>Precinct 10-A, Karachi</small></span></div>
        <div className="detail">◷ <span><b>Monday – Sunday</b><small>11:00 AM – 10:00 PM</small></span></div>
        <div className="detail">☎ <span><b>WhatsApp available</b><small>For questions and changes</small></span></div>
      </div>
      <div className="bookCard">
        {!done?<form onSubmit={book}>
          <small>BOOK APPOINTMENT</small>
          <h2>Choose your service</h2>
          <label>Service</label>
          <div className="serviceList">{services.map((s,i)=><button type="button" key={s.name} className={service===i?'service active':'service'} onClick={()=>setService(i)}><span><b>{s.name}</b><small>{s.duration}</small></span><strong>Rs {s.price.toLocaleString()}</strong></button>)}</div>
          <div className="formGrid">
            <label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label>
            <label>Time<select value={time} onChange={e=>setTime(e.target.value)} required><option value="">Select time</option>{['11:00 AM','12:30 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM','8:00 PM'].map(t=><option key={t}>{t}</option>)}</select></label>
          </div>
          <div className="formGrid">
            <label>Your name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/></label>
            <label>Phone / WhatsApp<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="03xx xxxxxxx" required/></label>
          </div>
          <button className="btn full">Confirm booking — Rs {services[service].price.toLocaleString()}</button>
          <p className="demoNote">Preview only. No payment is collected on this page.</p>
        </form>:<div className="successBox"><div className="successIcon">✓</div><h2>Appointment booked</h2><p>Your appointment is reserved for <b>{date}</b> at <b>{time}</b>.</p><button className="btn full" onClick={()=>{setDone(false);setName('');setPhone('');setTime('')}}>Book another appointment</button></div>}
      </div>
    </section>
  </main>
}
