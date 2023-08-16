import Constant from "../Constant"

export default {
  [Constant.FETCH_IMAGE_SLIDE] : (state,payload) => {
    state.bannerdata = payload.bannerdata
  },
  [Constant.FETCH_IMG_GRID] : (state,payload) => {
    state.clipdata = payload.clipdata
  },
  [Constant.FETCH_PROJECTS] : (state,payload) => {
    state.projectList = payload.projectList
  }
}