import { useNotificationValue } from '../context/NotificationContext'
const Notification = () => {
  const notification = useNotificationValue()
  if (!notification) {
    return null
  }
  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    // borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px',
  }

  return <div style={style}>{notification}</div>
}

export default Notification
