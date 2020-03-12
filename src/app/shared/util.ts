/**判断屏幕大小 */
const isFullScreen = () => {  //，这里根据返回值 true 或false ,返回true的话 则为全面屏
    let result = false;
    const rate = window.screen.height / window.screen.width;
    const limit = window.screen.height === window.screen.availHeight ? 1.8 : 1.65; // 临界判断值
    // window.screen.height为屏幕高度
    //  window.screen.availHeight 为浏览器 可用高度
    if (rate > limit) {
        result = true;
    }
    return result;
};

export { isFullScreen }
