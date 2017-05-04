/**
 * Created by zachary on 2016/12/9.
 *
 * leancloud error code:
 * https://leancloud.cn/docs/error_code.html
 */

export default ERRORCODE = {
  111: '字段类型错误',
  126: '无效的用户',
  200: '用户名为空',
  202: '用户名已经被占用',
  203: '电子邮箱地址已经被占用',
  204: '没有提供电子邮箱地址',
  210: '手机号和密码不匹配',
  211: '手机号未注册，请先注册',
  214: '手机号码已经被注册',
  603: '无效的短信验证码',
  701: '提现时间有误，请在系统指定时间提交提现申请',
  702: '无效的支付渠道',
  9998: '您不能关注自身',
  9999: '网络异常,亲请稍候再试哦^_^'
}
