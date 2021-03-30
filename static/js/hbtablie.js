/**
 *  table合并行通用 */
export function mergeTableRow(data, merge) {
  if (!merge || merge.length === 0) {
    return data
  }
  merge.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal]) {
        mList[rowVal]++
        data[index - (mList[rowVal] - 1)][m + '-span'].rowspan++
        v[m + '-span'] = {
          rowspan: 0,
          colspan: 0
        }
      } else {
        mList[rowVal] = 1
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}