import { useNotificationValue } from '../context/NotificationContext'
import Alert from 'react-bootstrap/Alert'
const Notification = () => {
  const notification = useNotificationValue()
  if (!notification) {
    return null
  }

  return (
    <Alert variant="success" className="my-4">
      {notification}
    </Alert>
  )
}

export default Notification
