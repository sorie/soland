import Constant from "../Constant"

export default {
  [Constant.FETCH_EVENTSLIDE] : (state,payload) => {
    state.bannerdata = payload.bannerdata
  },
  [Constant.FETCH_CLIP] : (state,payload) => {
    state.clipdata = payload.clipdata
  }
}