import {useState as UseState, useEffect as UseEffect} from 'react'

export const customHook = () => {
    const [Data,setData]= UseState([])
    const [DataTemp,setDataTemp] = UseState([])
    UseEffect(async ()=> {
        const api= await fetch("https://nextar.flip.id/frontend-test")
        let obj 
        if(api.status === 200){
            obj = await api.json()
        }
        const arr = Object.keys(obj);
        let newArr=[]
        arr.forEach(e => {
            newArr.push(obj[e])
        })
        setData(newArr)
        setDataTemp(newArr)
    },[])
    
    const filter = async e => {
        if(Data.length >0){
            if(e.target.value === 'a'){
                const temp= Data
                setData([])
                let arr = await temp.sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name));
                setData(arr);
            }else if(e.target.value === 'z'){
                const temp= Data
                setData([])
                let arr = await temp.sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name));
                setData(arr);
            }else if(e.target.value === "0"){
                const temp= Data
                setData([])
                let arr = await temp.sort((a, b) => {
                                                let da = new Date(a.created_at),
                                                db = new Date(b.created_at);
                                                return db - da;
                                            })
                setData(arr)
            }else if(e.target.value === "1"){
                const temp= Data
                setData([])
                let arr = await temp.sort((a, b) => {
                                                let da = new Date(a.created_at),
                                                db = new Date(b.created_at);
                                                return da - db;
                                            })
                setData(arr)
            }
        }
    }
    const search = e => {
        if(Data.length >0){
            const temp = Data
            const fil = temp.filter(v=> v.beneficiary_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || v.beneficiary_bank.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||  v.sender_bank.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
            setDataTemp(fil)
        }
    }
    const formatRupiah= angka => {
        const format = angka.toString().split('').reverse().join('');
        const convert = format.match(/\d{1,3}/g);
        const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
        return rupiah
    }
    const dateFormat = date => {
        const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let current_datetime = new Date(date)
        let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
        return formatted_date
    }
    return{
        filter,formatRupiah,dateFormat,
        search,
        Data,DataTemp, 
    }
}
