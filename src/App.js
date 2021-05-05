import Home from './component/home'
import Detail from './component/detail'
import {
  Route,Switch
} from 'react-router-dom'

const App = () => {
  const test = val=> {
    // if(typeof(val) === "string"){
    //   console.log('ini string')
    // }else{
    //   console.log('bukan string')
    // }
    // for(let i=0 ;i<=15;i++){
    //   if(i%7 === 0 && i%13 ===0){
    //     console.log('TicToc')
    //   }else if(i%7 === 0){
    //     console.log("Tic")
    //   }else if(i%13 === 0){
    //     console.log('Toc')
    //   }else{
    //     console.log(i)
    //   }
    // } 
    // let x = "a,a,b,b"
    // x = Array.from(new Set(x.split(','))).toString();
    // console.log(x);
    }
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      {test('1')}
      <Route exact path="/Detail" component={Detail}/>
    </Switch>
  )
}

export default App