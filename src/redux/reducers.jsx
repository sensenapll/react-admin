/**
 * 用来根据prevState和action生成newState函数模块
 */
//  prevState =11 为默认值
import { combineReducers } from "redux";
function aaa(prevState = 11, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}

function bbb(prevState = 11, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}
export default combineReducers({
  aaa,
  bbb
});
