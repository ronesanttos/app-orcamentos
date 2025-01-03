import "./message.css"

const Message = ({msg, msgType}) => {
  return (
    <div>
        <p className={`msg ${msgType}`}> {msg}</p>
    </div>
  )
}

export default Message
