'use client'
import { useMemo, useState } from 'react'

const seed=[
  {id:1,name:'Milk 1L',sku:'MILK-1L',stock:8,reorder:12,cost:250,price:285,supplier:'Fresh Foods',expiry:'2026-10-12'},
  {id:2,name:'Cooking Oil 5L',sku:'OIL-5L',stock:42,reorder:10,cost:2380,price:2599,supplier:'Prime Wholesale',expiry:'2027-03-01'},
  {id:3,name:'Rice 5kg',sku:'RICE-5KG',stock:5,reorder:15,cost:1320,price:1499,supplier:'Karachi Grains',expiry:'2027-01-20'},
  {id:4,name:'Shampoo 360ml',sku:'SH-360',stock:31,reorder:8,cost:620,price:749,supplier:'Care Distributors',expiry:'2028-05-01'},
  {id:5,name:'Tea 475g',sku:'TEA-475',stock:14,reorder:10,cost:1180,price:1349,supplier:'Prime Wholesale',expiry:'2027-06-15'}
]

export default function RetailDemo(){
  const [products,setProducts]=useState(seed)
  const [filter,setFilter]=useState('all')
  const low=products.filter(p=>p.stock<=p.reorder)
  const shown=filter==='low'?low:products
  const inventoryValue=useMemo(()=>products.reduce((n,p)=>n+p.stock*p.cost,0),[products])
  const restock=id=>setProducts(ps=>ps.map(p=>p.id===id?{...p,stock:p.stock+20}:p))

  return <main className="retailDemoPage">
    <div className="demoBadge">RETAIL DEMO</div>
    <aside className="retailDemoSide">
      <div className="adminBrand whiteAdmin"><span>B</span><b>BusinessFlow</b></div>
      <div className="retailDemoBusiness"><small>RETAIL</small><b>City Mart</b><span>Karachi</span></div>
      <nav><button className="selected">Overview</button><button>POS</button><button>Products</button><button>Suppliers</button><button>Sales</button></nav>
      <div className="retailDemoHint">Demo dashboard for marts & supermarkets</div>
    </aside>
    <section className="retailDemoMain">
      <header className="retailDemoTop"><div><small>CITY MART</small><h1>Retail dashboard</h1><p>Track daily sales, inventory and supplier activity.</p></div><button className="btn">+ New sale</button></header>
      <div className="retailDashStats">
        <div><span>Today sales</span><b>Rs 185,240</b><small>247 bills</small></div>
        <div><span>Gross profit</span><b>Rs 31,580</b><small>Demo estimate</small></div>
        <div><span>Low stock</span><b>{low.length}</b><small>Needs reorder</small></div>
        <div><span>Inventory value</span><b>Rs {Math.round(inventoryValue).toLocaleString()}</b><small>At cost</small></div>
      </div>
      <section className="retailDemoCard">
        <div className="retailDemoCardHead">
          <div><small>INVENTORY</small><h2>Products & stock</h2></div>
          <div className="retailFilters"><button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>All</button><button className={filter==='low'?'active':''} onClick={()=>setFilter('low')}>Low stock</button></div>
        </div>
        <div className="retailTableWrap"><table className="retailTable"><thead><tr><th>Product</th><th>Supplier</th><th>Stock</th><th>Cost</th><th>Sale price</th><th>Status</th><th>Action</th></tr></thead><tbody>
          {shown.map(p=><tr key={p.id}>
            <td><b>{p.name}</b><small>{p.sku}</small></td><td>{p.supplier}</td><td>{p.stock}</td><td>Rs {p.cost.toLocaleString()}</td><td>Rs {p.price.toLocaleString()}</td>
            <td><span className={p.stock<=p.reorder?'retailLowTag':'retailGoodTag'}>{p.stock<=p.reorder?'Low stock':'In stock'}</span></td>
            <td>{p.stock<=p.reorder?<button className="miniBtn" onClick={()=>restock(p.id)}>Restock +20</button>:<span className="doneText">Healthy</span>}</td>
          </tr>)}
        </tbody></table></div>
      </section>
      <section className="retailDemoBottom">
        <div><small>PAYMENT MIX</small><h3>Cash 61%</h3><p>Card 24% · Wallet 15%</p></div>
        <div><small>SUPPLIER PAYMENTS DUE</small><h3>Rs 73,000</h3><p>Across 4 suppliers</p></div>
        <div><small>EXPIRING SOON</small><h3>9 items</h3><p>Within the next 30 days</p></div>
      </section>
    </section>
  </main>
}
