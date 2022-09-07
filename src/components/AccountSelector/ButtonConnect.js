export default function ButtonConnect({ className, icon, title }) {
  return (
    <center>
      <div className={`home-btn-wrapper ${className}`}>
        <div>
          <img src={icon} alt="" className="button-connect" />
        </div>
        <p>{title}</p>
      </div>
    </center>
  )
}
