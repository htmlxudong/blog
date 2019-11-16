export default function ({ store, error }) {
  // 可通过组件的props接收error
  if (!store.state.userInfo.isAdmin) {
    error({
      message: '客官，您不是管理员',
      statusCode: 403
    })
  }
}
