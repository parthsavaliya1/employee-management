import React from 'react'

 function Popup({title,handleCancel,handleDelete}) {
  return (
    <div>
      <div>
        <div className="modal">
          <div className="modal-content" style={{width:'500px'}}>
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
            </div>
            <h5 className="modal-body" style={{textAlign:'center'}}> 
                Are you sure to delete?
            </h5>
            <div className="modal-footer">
              <button onClick={() =>handleDelete()} className="button confirm-btn">Confirm</button>
              <button onClick={() =>handleCancel()} className="button cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup