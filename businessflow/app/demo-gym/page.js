'use client'
import { useMemo, useState } from 'react'

const seed=[
  {id:1,name:'Ahmed Raza',phone:'0300 1112233',plan:'Monthly',fee:3500,renewal:'2026-10-08',status:'paid'},
  {id:2,name:'Saad Khan',phone:'0312 5556677',plan:'Monthly',fee:3500,renewal:'2026-10-09',status:'due'},
  {id:3,name:'Hamza Ali',phone:'0333 7654321',plan:'Quarterly',fee:9000,renewal:'2026-10-11',status:'paid'},
  {id:4,name:'Usman Tariq',phone:'0301 4448899',plan:'Monthly',fee:3500,renewal:'2026-10-12',status:'due'},
  {id:5,name:'Bilal Ahmed',phone:'0345 2227744',plan:'Monthly',fee:3500,renewal:'2026-10-15',status:'paid'},
  {id:6,name:'Danish Malik',phone:'0322 1010101',plan:'Monthly',fee:3500,renewal:'2026-10-17',status:'paid'}
]

export default function GymDemo(){
  const [members,setMembers]=useState(seed)
  const [filter,setFilter]=useState('all')
  const shown=members.filter(m=>filter==='all'||m.status===filter)
  const paid=members.filter(m=>m.status==='paid')
  const due=members.filter(m=>m.status==='due')
  const revenue=paid.reduce((n,m)=>n+m.fee,0)
  const markPaid=id=>setMembers(ms=>ms.map(m=>m.id===id?{...m,status:'paid'}:m))
  const renewalSoon=useMemo(()=>members.filter(m=>m.renewal<='2026-10-12').length,[members])

  return <main className="gymDemoPage">
    <div className="demoBadge">GYM DEMO</div>
    <aside className="gymDemoSide">
      <div className="adminBrand whiteAdmin"><span>B</span><b>BusinessFlow</b></div>
      <div className="gymDemoBusiness"><small>GYM</small><b>Iron House Fitness</b><span>Karachi</span></div>
      <nav><button className="selected">Overview</button><button>Members</button><button>Payments</button><button>Renewals</button><button>Plans</button></nav>
      <div className="gymDemoHint">Demo dashboard for gym owners</div>
    </aside>

    <section className="gymDemoMain">
      <header className="gymDemoTop"><div><small>IRON HOUSE FITNESS</small><h1>Membership dashboard</h1><p>Track members, payments and renewals in one place.</p></div><button className="btn">+ Add member</button></header>

      <div className="gymDashStats">
        <div><span>Total members</span><b>{members.length}</b><small>Active database</small></div>
        <div><span>Paid this cycle</span><b>{paid.length}</b><small>Rs {revenue.toLocaleString()} collected</small></div>
        <div><span>Payment due</span><b>{due.length}</b><small>Needs follow-up</small></div>
        <div><span>Renewals soon</span><b>{renewalSoon}</b><small>Next few days</small></div>
      </div>

      <section className="gymDemoCard">
        <div className="gymDemoCardHead">
          <div><small>MEMBERS</small><h2>Membership payments</h2></div>
          <div className="gymFilters">
            <button onClick={()=>setFilter('all')} className={filter==='all'?'active':''}>All</button>
            <button onClick={()=>setFilter('paid')} className={filter==='paid'?'active':''}>Paid</button>
            <button onClick={()=>setFilter('due')} className={filter==='due'?'active':''}>Due</button>
          </div>
        </div>
        <div className="gymMemberTableWrap"><table className="gymMemberTable">
          <thead><tr><th>Member</th><th>Plan</th><th>Monthly fee</th><th>Renewal</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{shown.map(m=><tr key={m.id}>
            <td><b>{m.name}</b><small>{m.phone}</small></td>
            <td>{m.plan}</td>
            <td>Rs {m.fee.toLocaleString()}</td>
            <td>{new Date(m.renewal+'T00:00:00').toLocaleDateString('en-PK',{day:'2-digit',month:'short',year:'numeric'})}</td>
            <td><span className={m.status==='paid'?'gymPaidTag':'gymDueTag'}>{m.status==='paid'?'Paid':'Due'}</span></td>
            <td>{m.status==='due'?<button className="miniBtn" onClick={()=>markPaid(m.id)}>Mark paid</button>:<span className="doneText">Recorded</span>}</td>
          </tr>)}</tbody>
        </table></div>
      </section>

      <section className="gymDemoBottom">
        <div><small>PAYMENT COLLECTION</small><h3>Rs {revenue.toLocaleString()}</h3><p>Recorded membership revenue in this demo cycle.</p></div>
        <div><small>RENEWAL ATTENTION</small><h3>{due.length} members</h3><p>Currently marked as payment due.</p></div>
      </section>
    </section>
  </main>
}
