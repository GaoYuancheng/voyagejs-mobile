/*
 * 给定一个精度, 计算一组数据中某项数据占据的百分比, 确保所有数据的百分比之和为 1, 即 100%
 *
 * @param  {Array.<number>} valueList a list of all data
 * @param  {number} idx index of the data to be processed in valueList
 * @param  {number} precision integer number showing digits of precision
 * @return {number} percent ranging from 0 to 100
 */
export function getPercentWithPrecision(valueList, idx, precision) {
  if (!valueList[idx]) return 0

  // 计算 valueList 中所有数据项之和
  let sum = valueList.reduce(function (acc, val) {
    return acc + val
  }, 0)

  if (sum === 0) return 0

  // 中间值, 用来计算总席位数和扩大比例来保留精度
  var digits = Math.pow(10, precision)

  // 计算每组数据的得票结果(整数部分和余额部分): 整数部分为所得该数据首次分配席位, 余额部分决定首次分配之后剩余席位的分配
  var votesPerQuota = valueList.map(function (val) {
    // 乘以 digits, 是为了通过扩大比例来保留精度, 这样可以确保正数部分是已经确定的议席位置
    // 乘以 100, 是因为最后返回结果为百分比
    return (val / sum) * digits * 100
  })

  // 总席位数: 因为所有quota除以sum之和为1, 上一步计算为了保留精度和返回为百分比, 把得票结果扩大了 digits*100 倍, 因此总席位数计算方式如下
  var targetSeats = digits * 100

  // 首次分配席位
  var seats = votesPerQuota.map(function (votes) {
    return Math.floor(votes) // 整数部分就是每个quota首次分配的席位
  })

  // 当前已经分配出去的席位总数
  var currentSum = seats.reduce(function (acc, val) {
    return acc + val
  }, 0)

  // 计算每个quota的余额
  var remainder = votesPerQuota.map(function (votes, idx) {
    return votes - seats[idx]
  })

  // 分配剩余席位, 直到所有席位分配完毕
  while (currentSum < targetSeats) {
    var max = Number.NEGATIVE_INFINITY // 最大余额, 初始重置为无穷小
    var maxId = null // 余数最大的 id

    // 选出这组余额数据中最大值
    for (var i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i]
        maxId = i
      }
    }

    ++seats[maxId] // 最大余数对应数据席位 +1
    remainder[maxId] = 0 // 最大余数重置为 0, 保证不会再分配
    ++currentSum // 当前已分配席位总数 +1, 保证最终可以退出分配循环
  }

  // idx 对应数据分配的席位除以总席位数就是 idx 在这组数据中保留精度 precision 的百分比
  return seats[idx] / digits
}
