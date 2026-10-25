import { Component } from 'react'

// Keep an isolated portfolio render failure from unmounting the cinematic cover.
export default class PortfolioBoundary extends Component {
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 componentDidCatch(error,info){console.error('Portfolio section failed:',error,info.componentStack)}
 render(){
  if(this.state.failed)return <section role="alert" style={{padding:'48px 6%',color:'#dce8df',background:'#030605'}}><p>โหลดส่วนผลงานไม่สำเร็จ กรุณาลองอีกครั้ง</p><button onClick={()=>this.setState({failed:false})} style={{padding:'12px 20px',borderRadius:8,border:'1px solid #a9c8b5',background:'#10241a'}}>ลองโหลดผลงานอีกครั้ง</button></section>
  return this.props.children
 }
}
