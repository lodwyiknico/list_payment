import '../App.css';
import {customHook} from '../cusomHook'
import {connect} from 'react-redux'
import {setDetail} from '../actions/actions'
import {Link} from 'react-router-dom'

const Home = ({setDetail}) => {
  const {
    filter, formatRupiah, dateFormat,
    search, Data, DataTemp
  } = customHook()

  return (
    <div className="container">
      <div className="App"style={{margin:'25px'}}>
        <h1 style={{fontWeight:'300'}}>Daftar Transaksi</h1>
      </div>
      <div style={{fontWeight:'600'}}>Halo kak!</div>
      <p style={{margin:'0px'}}>
        Kamu telah melakukan transaksi sebesar <span style={{color:'#fd6542'}}>Rp.5.000.000</span> sejak menggunakan Flip.
      </p>
      <div className="input-group">
        <div className="inputContainer">
            <img className="icon" src={'./cari.png'} width='15px' alt='cari'/>
            <input onChange={search} className="Field" type="text" placeholder="Cari nama atau bank" />
            <select name="Urutkan" onChange={filter} className='FieldSelect' id="filter" >
            <option style={{textAlign:'right'}} value="">URUTKAN</option>
            <option value="a">Nama A-Z</option>
            <option value="z">Nama Z-A</option>
            <option value="0">Tanggal terbaru</option>
            <option value="1">Tanggal terlama</option>
            </select>
        </div>
      </div>
      {Data && Data.map((val,i)=> (
        <div key={i}>
            {DataTemp.length> 0 && DataTemp.some(e=> e.id === val.id)&&
                <Link onClick={()=>setDetail(val)} to="/detail" style={{textDecoration: 'none',color: 'black'}}>
                    <div style={val.status ==="PENDING" ?{borderLeftColor: '#fd6542'}:(val.status==="SUCCESS" && {borderLeftColor: '#56b586'})}  className="card containerCard">
                    <div style={{fontWeight:'600'}}>
                        {val.sender_bank.toUpperCase()} &#10132; {val.beneficiary_bank.toUpperCase()}
                    </div>
                    <div style={{display: 'grid',gridTemplateColumns: 'auto auto',gridGap: '0px'}}>
                        <div>
                        {val.beneficiary_name} 
                        </div>
                        <div className="right">
                            {val.status ==="PENDING" &&
                                <button className="btnfailed">Pengecekan</button>
                            }
                            {val.status ==="SUCCESS" &&
                                <button className="btnsuccess right">Berhasil</button> 
                            }
                        </div>
                    </div>
                    <div style={{display: 'grid',gridTemplateColumns: '94px 10px auto auto',gridGap: '0px'}}>
                        <span>{formatRupiah(val.amount)}</span>
                        <span style={{  display: 'list-item',listStyleType: 'disc',listStylePosition: 'inside'}}></span>
                        <span>
                        {dateFormat(val.created_at)}
                        </span>
                    </div>
                    
                    </div>
                </Link> 
            }
        </div>
      ))}
    
    </div>
  );
}

const mapStateToProps = (state) => ({
    appState:state
})
const mapDispatchToProps = (dispatch) => ({
    setDetail: val => dispatch(setDetail(val))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
