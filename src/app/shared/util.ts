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

// 把date类型转换为用-连接的字符串，type为day或month
const dateTransform = (date: Date, type): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthStr = month < 10 ? `0${month}` : month;
    const day = date.getDate();
    const dayStr = day < 10 ? `0${day}` : day;
    if (type === 'day') {
        return `${year}-${monthStr}-${dayStr}`;
    } else {
        return `${year}-${monthStr}`;
    }
};

export { isFullScreen, dateTransform };
