'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAIL='muhammadhishamoraginal@gmail.com'
const supabase=createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export default function AdminLogin(){
  const router=useRouter()
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')
  const [busy,setBusy]=useState(false)

  useEffect(()=>{check()},[])
  async function check(){
    const {data:{user}}=await supabase.auth.getUser()
    if(user?.email?.toLowerCase()===ADMIN_EMAIL)router.replace('/admin')
    else if(user)await supabase.auth.signOut()
  }

  async function login(e){
    e.preventDefault();setBusy(true);setMessage('')
    const {data,error}=await supabase.auth.signInWithPassword({email:ADMIN_EMAIL,password})
    if(error){setMessage(error.message);setBusy(false);return}
    if(data.user?.email?.toLowerCase()!==ADMIN_EMAIL){
      await supabase.auth.signOut();setMessage('Access denied.');setBusy(false);return
    }
    router.replace('/admin')
  }

  async function createAccount(){
    if(password.length<10){setMessage('Password must be at least 10 characters.');return}
    setBusy(true);setMessage('')
    const {data,error}=await supabase.auth.signUp({email:ADMIN_EMAIL,password})
    if(error){setMessage(error.message);setBusy(false);return}
    if(data.session){router.replace('/admin');return}
    setMessage('Admin account created. Open the confirmation email sent to your Gmail, confirm it, then sign in here.')
    setBusy(false)
  }

  return <main className="adminLogin">
    <form className="adminLoginCard" onSubmit={login}>
      <div className="adminBrand"><span>B</span><b>BusinessFlow Admin</b></div>
      <small>PRIVATE ADMIN LOGIN</small>
      <h1>Welcome back</h1>
      <p>This login is locked to the authorized BusinessFlow Gmail account. Other email addresses cannot be entered here.</p>
      <label>Authorized Gmail<input type="email" value={ADMIN_EMAIL} readOnly disabled/></label>
      <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your admin password" autoComplete="current-password" required/></label>
      <button className="btn full" disabled={busy}>{busy?'Please wait…':'Sign in to admin'}</button>
      <button type="button" className="adminTextBtn" disabled={busy} onClick={createAccount}>First time? Create this admin account</button>
      {message&&<div className="authMsg">{message}</div>}
      <a className="adminBack" href="/">← Back to BusinessFlow</a>
    </form>
  </main>
}
