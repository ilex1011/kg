import React, { Fragment, useState } from "react";
import FileUpload from "./FileUpload";
const EditTodo = ({ test }) => {
  const [sonumber, setDescription] = useState(test.sonumber);
  const [qty, setqty] = useState(test.qty);
  const [weight, setweight] = useState(test.weight);
  const [height, setheight] = useState(test.height);
  const [length, setlength] = useState(test.length);
  const [width, setwidth] = useState(test.width);
  const [awh, setawh] = useState(test.awh);
  const [companyname, setcompanyname] = useState(test.companyname);
  //edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { sonumber, qty, awh, length, weight, height, width, companyname };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  /*const updateqty = async a => {
    a.preventDefault();
    try {
      const body = { qty };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateawh = async b => {
    b.preventDefault();
    try {
      const body = { awh };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const updatecom = async c => {
    c.preventDefault();
    try {
      const body = { companyname };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const updatewidth = async d => {
    d.preventDefault();
    try {
      const body = { width };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const updateweight = async f => {
    f.preventDefault();
    try {
      const body = { weight };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateheight = async g => {
    g.preventDefault();
    try {
      const body = { height };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const updatelength = async h => {
    h.preventDefault();
    try {
      const body = { length };
      const response = await fetch(
        `http://192.168.51.173:5000/todos/${test.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };*/
  return (
    <Fragment>
      
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target={`#id${test.todo_id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${test.todo_id}`}
        onClick={() => setDescription(test.sonumber)}
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(test.sonumber)}
              >
                &times;
              </button>
            </div>
              {/*<div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                </div>
                <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                </div>
              </div>*/}
            <div class="modal-body">
            <div class="form-group col-md-5">
            <label for="inputSO">SO number</label>
              <input
                type="text"
                className="form-control"
                id = "inputSO"
                value={sonumber}
                onChange={e => setDescription(e.target.value)}
              />
              </div>
              <div class="form-row">
              <div class="form-group col-md-4">
              <label for="inputAWB">AWB</label>
              <input
                type="text"
                className="form-control"
                id = "inputAWB"
                value={awh}
                onChange={a => setawh(a.target.value)}
              />
              </div>
              <div class="form-group col-md-4">
              <label for="inputCompany">Company</label>
              <input
                type="text"
                className="form-control"
                id = "inputCompany"
                value={companyname}
                onChange={b => setcompanyname(b.target.value)}
              />
              </div>
              </div>
              <div class="form-row">
              <div class="form-group col-md-2">
              <label for="inputL">L 長 (cm)</label>
              <input
                type="text"
                className="form-control"
                id = "inputL"
                value={length}
                onChange={c => setlength(c.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputW">W 寬 (cm)</label>
              <input
                type="text"
                className="form-control"
                id = "inputW"
                value={width}
                onChange={d => setwidth(d.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputH">H 高 (cm)</label>
              <input
                type="text"
                className="form-control"
                id = "inputH"
                value={height}
                onChange={f => setheight(f.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputQTY">QTY 數量</label>
              <input
                type="text"
                className="form-control"
                id = "inputQTY"
                value={test.qty}
                onChange={g => setqty(g.target.value)}
              />
              </div>
              <div class="form-group col-md-2">
              <label for="inputWeight">Weight 重量（kg）</label>
              <input
                type="text"
                className="form-control"
                id = "inputWeight"
                value={weight}
                onChange={h => setweight(h.target.value)}
              />
              </div>
              </div>
              {/*<div>
                <FileUpload/>
              </div>*/}
              <div class="form-group col-md-3">
              <label for="upload">UploadImage 上載圖片</label>
              <input type="file" accept="image/*" class="form-control-file" id="upload"/>
              </div>
            </div>
            
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}

              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-dark"
                data-dismiss="modal"
                onClick={() => setDescription(test.sonumber)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;