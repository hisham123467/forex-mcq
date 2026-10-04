'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAIL='muhammadhishamoraginal@gmail.com'
const supabase=createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

const emptyService=()=>({name:'',price:'',duration:'30'})

export default function Admin(){
  const router=useRouter()
  const [user,setUser]=useState(null)
  const [checking,setChecking]=useState(true)
  const [businesses,setBusinesses]=useState([])
  const [bookingCount,setBookingCount]=useState(0)
  const [creating,setCreating]=useState(false)
  const [form,setForm]=useState({name:'',category:'Barber / Salon',city:'Karachi',phone:'',address:''})
  const [services,setServices]=useState([emptyService(),emptyService()])
  const [notice,setNotice]=useState('')

  useEffect(()=>{
    init()
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{
      const u=session?.user||null
      if(u?.email?.toLowerCase()===ADMIN_EMAIL)setUser(u)
      else if(u){supabase.auth.signOut();setUser(null)}
    })
    return()=>subscription.unsubscribe()
  },[])

  async function init(){
    const {data:{user:u}}=await supabase.auth.getUser()
    if(u?.email?.toLowerCase()===ADMIN_EMAIL){
      setUser(u); await load(u.id)
    }else{
      if(u) await supabase.auth.signOut()
      router.replace('/admin-login')
    }
    setChecking(false)
  }

  async function load(uid=user?.id){
    if(!uid)return
    const [b,q]=await Promise.all([
      supabase.from('businesses').select('id,name,slug,category,city,phone,address,plan,is_active,created_at').eq('owner_id',uid).order('created_at',{ascending:false}),
      supabase.from('bookings').select('id',{count:'exact',head:true})
    ])
    if(!b.error)setBusinesses(b.data||[])
    if(!q.error)setBookingCount(q.count||0)
  }

  async function logout(){await supabase.auth.signOut();setUser(null);setBusinesses([])}

  function updateService(i,key,value){setServices(s=>s.map((x,n)=>n===i?{...x,[key]:value}:x))}

  async function createBusiness(e){
    e.preventDefault()
    if(!user)return
    setCreating(true);setNotice('')
    const slug=(form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'business')+'-'+crypto.randomUUID().slice(0,6)
    const {data:b,error}=await supabase.from('businesses').insert({
      owner_id:user.id,name:form.name.trim(),slug,category:form.category,city:form.city.trim(),
      phone:form.phone.trim(),address:form.address.trim(),plan:'free',is_active:true
    }).select().single()
    if(error){setNotice(error.message);setCreating(false);return}
    const rows=services.filter(s=>s.name.trim()).map(s=>({
      business_id:b.id,name:s.name.trim(),price:Number(s.price||0),duration_min:Number(s.duration||30),is_active:true
    }))
    if(rows.length){const {error:se}=await supabase.from('services').insert(rows);if(se)setNotice('Business created, but services error: '+se.message)}
    setForm({name:'',category:'Barber / Salon',city:'Karachi',phone:'',address:''});setServices([emptyService(),emptyService()])
    setNotice('Business page created.')
    await load(user.id);setCreating(false)
  }

  async function changeBusiness(id,updates){
    const {error}=await supabase.from('businesses').update(updates).eq('id',id).eq('owner_id',user.id)
    if(error){setNotice(error.message);return}
    await load(user.id)
  }

  const active=useMemo(()=>businesses.filter(b=>b.is_active).length,[businesses])
  const paid=useMemo(()=>businesses.filter(b=>b.plan!=='free').length,[businesses])

  if(checking)return <main className="adminLoading">Checking admin access…</main>

  if(!user)return <main className="adminLoading">Redirecting to secure login…</main>

  return <main className="adminShell">
    <aside className="adminSide">
      <div className="adminBrand whiteAdmin"><span>B</span><b>BusinessFlow</b></div>
      <div className="adminUser"><small>ADMIN</small><b>{ADMIN_EMAIL}</b></div>
      <nav><button className="selected">Overview</button><button onClick={()=>document.getElementById('new-business')?.scrollIntoView({behavior:'smooth'})}>Create business</button><button onClick={()=>document.getElementById('clients')?.scrollIntoView({behavior:'smooth'})}>Businesses</button></nav>
      <button className="adminLogout" onClick={logout}>Sign out</button>
    </aside>

    <section className="adminMain">
      <header className="adminTop"><div><small>BUSINESSFLOW</small><h1>Admin dashboard</h1></div><a href="/" target="_blank" className="btn light">Open website ↗</a></header>
      <div className="adminStats">
        <div><span>Businesses</span><b>{businesses.length}</b><small>Total created</small></div>
        <div><span>Active pages</span><b>{active}</b><small>Publicly accessible</small></div>
        <div><span>Paid clients</span><b>{paid}</b><small>Starter + Pro</small></div>
        <div><span>Bookings</span><b>{bookingCount}</b><small>Across your businesses</small></div>
      </div>

      <section id="new-business" className="adminCard">
        <div className="adminCardHead"><div><small>NEW PROSPECT / CLIENT</small><h2>Create a business page</h2></div><span>Starts as Preview</span></div>
        <form onSubmit={createBusiness}>
          <div className="adminFormGrid">
            <label>Business name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Elite Salon" required/></label>
            <label>Type<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Barber / Salon</option><option>Beauty Salon</option><option>Clinic</option><option>Workshop</option><option>Consultant</option><option>Other</option></select></label>
            <label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required/></label>
            <label>WhatsApp / phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+92 3xx xxxxxxx"/></label>
          </div>
          <label>Address<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Area, city"/></label>

          <div className="serviceEditor">
            <div className="serviceEditorHead"><b>Services</b><button type="button" onClick={()=>setServices([...services,emptyService()])}>+ Add service</button></div>
            {services.map((s,i)=><div className="serviceEditRow" key={i}>
              <input placeholder="Service name" value={s.name} onChange={e=>updateService(i,'name',e.target.value)}/>
              <input type="number" min="0" placeholder="Price" value={s.price} onChange={e=>updateService(i,'price',e.target.value)}/>
              <input type="number" min="5" placeholder="Minutes" value={s.duration} onChange={e=>updateService(i,'duration',e.target.value)}/>
              <button type="button" onClick={()=>setServices(services.filter((_,n)=>n!==i))}>×</button>
            </div>)}
          </div>
          <button className="btn" disabled={creating}>{creating?'Creating…':'Create private sales page'}</button>
          {notice&&<span className="adminNotice">{notice}</span>}
        </form>
      </section>

      <section id="clients" className="adminCard">
        <div className="adminCardHead"><div><small>CLIENTS</small><h2>Your business pages</h2></div></div>
        {!businesses.length?<div className="emptyAdmin">No businesses yet. Create your first prospect above.</div>:
        <div className="adminTableWrap"><table className="adminTable"><thead><tr><th>Business</th><th>City</th><th>Plan</th><th>Status</th><th>Page</th><th>Actions</th></tr></thead><tbody>
          {businesses.map(b=><tr key={b.id}>
            <td><b>{b.name}</b><small>{b.category}</small></td>
            <td>{b.city||'—'}</td>
            <td><select value={b.plan} onChange={e=>changeBusiness(b.id,{plan:e.target.value})}><option value="free">Preview</option><option value="starter">Starter</option><option value="pro">Pro</option></select></td>
            <td><span className={b.is_active?'liveTag':'offTag'}>{b.is_active?'Active':'Paused'}</span></td>
            <td><a className="tableLink" href={'/p/'+b.slug} target="_blank">Open ↗</a></td>
            <td><button className="miniBtn" onClick={()=>changeBusiness(b.id,{is_active:!b.is_active})}>{b.is_active?'Pause':'Activate'}</button></td>
          </tr>)}
        </tbody></table></div>}
      </section>
    </section>
  </main>
}
