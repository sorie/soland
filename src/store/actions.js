import Constant from '../Constant';
import axios from 'axios';
// import "./style.css";
import { createApi } from "unsplash-js";

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "UZc-Cn14G47aaw0SGFkR_16DLMHNBZfZTT_BClvvtQ8"
});

export default {
  [Constant.FETCH_EVENTSLIDE] : (store) => {
    api.search
    .getPhotos({ query: "Penguin", orientation: "landscape" })
    .then(result => {
      const imagedata = result.response;
      console.log(imagedata);
      store.commit(Constant.FETCH_EVENTSLIDE, { bannerdata : imagedata })
    })
    .catch(() => {
      console.log("something went wrong!");
    });
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