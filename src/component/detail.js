import {connect} from 'react-redux'
import {useHistory as UseHistory} from 'react-router-dom';
import {customHook} from '../cusomHook'
import {setDetail} from '../actions/actions'
import {Link} from 'react-router-dom'

const detail = ({appState}) => {
    if(appState.Detail.length === 0){
        const history = UseHistory()
        history.push('/')
    }
    const {
         formatRupiah, dateFormat,
      } = customHook()
    const headScnd ={
        fontWeight:'700',fontSize:'15px',marginTop:'25px'
    }
    const font={
        fontSize:'14px'
    }
    return(
        <div className="container">
            {console.log(appState)}
            {appState.Detail.map((val,i)=>(
                <div key={i}>
                    <div className="App"style={{margin:'25px'}}>
                        <h1 style={{fontWeight:'300'}}>Detail Transaksi</h1>
                    </div>
                    <div style={{borderLeftStyle:'unset', fontWeight:'500'}}className="card containerCard">
                        <div style={{display: 'grid',gridTemplateColumns: 'auto auto',gridGap: '0px'}}>
                            <div style={{marginTop:'8px'}}>
                                ID TRANSAKSI: #{val.id}
                            </div>
                            <div className="right" style={{margin:'0px'}}>
                            {val.status ==="PENDING" &&
                                <button className="btnfailed">Pengecekan</button>
                            }
                            {val.status ==="SUCCESS" &&
                                <button className="btnsuccess right">Berhasil</button> 
                            }
                        </div>
                        </div>
                    </div>
                    <div style={{borderLeftStyle:'unset'}} className="card containerCard">
                        <div style={{display: 'grid',gridTemplateColumns: '70px auto',gridGap: '0px',marginTop:'25px'}}>
                            <i className="fa fa-inbox" style={{color: '#fd6542',fontSize: '45px'}} aria-hidden="true"></i>
                            <div style={{textAlign:'left',marginBottom:'35px'}}>
                                <div style={{fontWeight:'700',fontSize:'15px'}}>
                                    PENGIRIM
                                </div>
                                <div>
                                    {val.sender_bank.toUpperCase()}
                                </div>
                                <div style={headScnd}>
                                    PENERIMA
                                </div>
                                <div style={font}>
                                    {val.beneficiary_bank.toUpperCase()}
                                </div>
                                <div style={font}>
                                    {val.account_number}
                                </div>
                                <div style={font}>
                                    {val.beneficiary_name}
                                </div>
                                <div style={headScnd}>
                                    NOMINAL
                                </div>
                                <div style={font}>
                                    {formatRupiah(val.amount)}
                                </div>
                                <div style={font}>
                                    <span style={{fontWeight:'600'}}>Kode Unik</span>: {val.unique_code}
                                </div>
                                <div style={headScnd}>
                                    CATATAN
                                </div>
                                <div style={font}>
                                    {val.remark}
                                </div>
                                <div style={headScnd}>
                                    WAKTU DIBUAT
                                </div>
                                <div style={font}>
                                    {dateFormat(val.created_at)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/" style={{textDecoration: 'none',color: '#fd6542'}}>
                        <button className="btnfailed active" style={{color:'#fd6542',cursor:'pointer'}}>Kembali</button>
                    </Link>
                </div>
            ))}
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    appState:state
})
const mapDispatchToProps = (dispatch) => ({
    setDetail: val => dispatch(setDetail(val))
})
export default connect(mapStateToProps, mapDispatchToProps)(detail)