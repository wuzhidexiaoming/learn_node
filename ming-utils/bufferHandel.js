/**
 *
 * @param buffer
 * @param delimiter
 * @returns {[]}
 */
exports.bufferHandel = function (buffer, delimiter) {
  // 创建一个数据，保存分割后的内容
  let arr = [];
  let n = 0;
  // 循环寻找分割符位置，使n=分割符位置且n!==-1
  while ((n = buffer.indexOf(delimiter)) !== -1) {
    // 每找到一个分隔符，就把分隔符前的内容添加到数组当中
    arr.push(buffer.slice(0, n));
    // 每次都修改buffer，跳过分隔符，使下一次循环直接从内容开始找下一个分隔符
    buffer = buffer.slice(n + delimiter.length);
  }
  // 将最后一个分隔符后面的内容添加到数组中
  arr.push(buffer);
  return arr;
};
