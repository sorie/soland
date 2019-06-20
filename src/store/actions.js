import Constant from '../Constant';
import axios from 'axios';


export default {
  [Constant.FETCH_EVENTSLIDE] : (store) => {
    let jq_header = 'jQuery112306467581448671456_1549500996465'
    let apiUrl = 'http://api.tving.com/v1/operator/highlights?callback=jQuery112306467581448671456_1549500996465&positionKey=PCV7_MAIN_TOP_ROLLING&cacheTime=5&screenCode=CSSD0100&networkCode=CSND0900&osCode=CSOD0900&teleCode=CSCD0900&apiKey=1e7952d0917d6aab1f0293a063697610&responseType=group&_=1549500996469'
    axios.get(apiUrl)
    .then((res) =>{
      // this.axiosFunc(jq_header,res)
      let tmp1 = res.data
      let tmp2 = tmp1.replace(jq_header,"")
      let tmp3 = tmp2.replace(tmp2[0],"")
      let find = ")";
      let lastIndex = tmp3.lastIndexOf(find);
      if (lastIndex === -1) {
        return tmp3;
      }
      let beginString = tmp3.substring(0, lastIndex)
      let finallyres = JSON.parse(beginString)
      // console.log(finallyres);

      let actbannerdata = finallyres.body.result
      console.log("bannerdata")
      console.log(actbannerdata)
      store.commit(Constant.FETCH_EVENTSLIDE, { bannerdata : actbannerdata })

     }).catch(error => {
       console.log('There was an error: ' + error.message)
     })
  },
  [Constant.FETCH_CLIP] : (store) => {
    let jq_header = 'jQuery112302632995043117874_1551334439778'
    let apiUrl = `http://api.tving.com/v1/operator/pick/curations?callback=${jq_header}&screenCode=CSSD0100&networkCode=CSND0900&osCode=CSOD0900&teleCode=CSCD0900&apiKey=1e7952d0917d6aab1f0293a063697610&responseType=group&_=1551334439783`
    axios.get(apiUrl)
    .then((res) =>{
      let tmp1 = res.data
      let tmp2 = tmp1.replace(jq_header,"")
      let tmp3 = tmp2.replace(tmp2[0],"")
      let find = ")";
      let lastIndex = tmp3.lastIndexOf(find);
      if (lastIndex === -1) {
        return tmp3;
      }
      let beginString = tmp3.substring(0, lastIndex)
      let finallyres = JSON.parse(beginString)
      // console.log("finallyres")
      // console.log(finallyres)

      let actclipdata = finallyres.body.result
      console.log("clipdata")
      console.log(actclipdata)
      store.commit(Constant.FETCH_CLIP, { clipdata : actclipdata })
    }).catch(error => {
      console.log('There was an error: ' + error.message)
    })
  }

}