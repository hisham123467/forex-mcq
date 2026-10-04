'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export default function BusinessPage(){
  const {slug}=useParams()
  const [business,setBusiness]=useState(null)
  const [services,setServices]=useState([])
  const [selected,setSelected]=useState(0)
  const [date,setDate]=useState('')
  const [time,setTime]=useState('')
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{load()},[slug])
  async function load(){
    const {data:b}=await supabase.from('businesses').select('id,name,slug,category,city,phone,address,plan,is_active').eq('slug',slug).eq('is_active',true).maybeSingle()
    if(!b){setLoading(false);return}
    const {data:s}=await supabase.from('services').select('id,name,price,duration_min').eq('business_id',b.id).eq('is_active',true).order('created_at')
    setBusiness(b);setServices(s||[]);setLoading(false)
  }

  async function book(e){
    e.preventDefault()
    const s=services[selected]
    if(!business||!s||!date||!time||!name||!phone)return
    const {error}=await supabase.from('bookings').insert({
      business_id:business.id,service_id:s.id,service_name:s.name,price:s.price,
      booking_date:date,booking_time:time,customer_name:name,customer_phone:phone,status:'confirmed'
    })
    if(!error)setDone(true)
  }

  if(loading)return <main className="publicLoading">Loading…</main>
  if(!business)return <main className="publicMissing"><h1>Page unavailable</h1><p>This business page is not active right now.</p></main>
  const isPreview=business.plan==='free'
  const initials=business.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()

  return <main className="clientPage">
    {isPreview&&<div className="previewRibbon">PREVIEW</div>}
    <section className="clientHero">
      <div className="clientIdentity">
        <div className="clientMark">{initials}</div>
        <div><small>ONLINE BOOKING</small><h1>{business.name}</h1><p>{business.category}{business.city?' · '+business.city:''}</p></div>
      </div>
    </section>
    <section className="clientGrid">
      <div className="clientInfo">
        <h2>Book your appointment</h2>
        <p>Choose a service and a time that works for you. Your appointment will be sent directly to {business.name}.</p>
        {business.address&&<div className="clientDetail">⌖ <span><b>Location</b><small>{business.address}</small></span></div>}
        {business.phone&&<div className="clientDetail">☎ <span><b>WhatsApp / phone</b><small>{business.phone}</small></span></div>}
        <div className="clientDetail">◷ <span><b>Appointments</b><small>Book online anytime</small></span></div>
      </div>
      <div className="clientBookCard">
        {!done?<form onSubmit={book}>
          <small>BOOK APPOINTMENT</small><h2>Select a service</h2>
          <div className="clientServices">{services.map((s,i)=><button type="button" key={s.id} onClick={()=>setSelected(i)} className={selected===i?'clientService active':'clientService'}><span><b>{s.name}</b><small>{s.duration_min} min</small></span><strong>Rs {Number(s.price).toLocaleString()}</strong></button>)}</div>
          {!services.length&&<p className="noServices">Services will be added soon.</p>}
          <div className="formGrid"><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label><label>Time<select value={time} onChange={e=>setTime(e.target.value)} required><option value="">Select</option>{['11:00 AM','12:30 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM','8:00 PM'].map(t=><option key={t}>{t}</option>)}</select></label></div>
          <div className="formGrid"><label>Your name<input value={name} onChange={e=>setName(e.target.value)} required/></label><label>Phone / WhatsApp<input value={phone} onChange={e=>setPhone(e.target.value)} required/></label></div>
          <button className="btn full" disabled={!services.length}>Confirm appointment</button>
          {isPreview&&<p className="demoNote">Preview page — bookings are for demonstration while this business is being set up.</p>}
        </form>:<div className="successBox"><div className="successIcon">✓</div><h2>Appointment confirmed</h2><p>Your booking with <b>{business.name}</b> is set for <b>{date}</b> at <b>{time}</b>.</p><button className="btn full" onClick={()=>{setDone(false);setName('');setPhone('');setTime('')}}>Book another</button></div>}
      </div>
    </section>
  </main>
}
