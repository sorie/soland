import Constant from '../Constant';
// import axios from 'axios';
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
    api.search
    .getPhotos({ query: "seoul", orientation: "landscape" })
    .then(result => {
      const clipdata = result.response;
      console.log(clipdata);
      store.commit(Constant.FETCH_CLIP, { clipdata : clipdata })
    })
    .catch(() => {
      console.log("something went wrong!");
    });
  }

}