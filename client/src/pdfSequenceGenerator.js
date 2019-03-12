import React from "react";
import Navbar from "./components/Navbar";
import * as data from "./data/courses.json";
import * as jsPDF from "jspdf";
import { Table, Modal } from "react-bootstrap";
import Button from "./components/Button";
import * as html2canvas from "html2canvas";

class PdfSequenceGenerator extends React.Component {
  constructor() {
    super();

    this.state = {
      courses: data.default.sequence,
      selectedCoursesFall: [],
      selectedCoursesWinter: [],
      selectedCoursesSummer: [],
      showAdd: false,
      showRemove: false,
      selectYear: true,
      sequenceYear: null
    };
  }

  convertToPDF = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.output("/jimmyTest.pdf");
      pdf.save("jimmyTest.pdf");
    });
  };

  // FUNCTIONS() HERE *********************************************************

  convertToPDF = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.output("/jimmyTest.pdf");
      pdf.save("jimmyTest.pdf");
    });
  };

  addClass = () => {
    let fall = this.state.selectedCoursesFall; //Keep track of user selected classes for Fall
    let winter = this.state.selectedCoursesWinter; //Keep track of user selected classes for Winter
    let summer = this.state.selectedCoursesSummer; //Keep track of user selected classes for Summer
    let input = document.getElementById("add-class").value; //Get user input
    let classList = this.state.courses; //Gets the whole list of courses of concordia
    let errorMessage = document.getElementById("addStatus");
    let semester = document.getElementById("semester").value;
    let addedClass;
    let classExists = false;

    for (let i = 0; i < fall.length; i++) {
      //This loop prevents duplicates for fall table
      if (fall[i].course === input && fall[i].semester === semester) {
        errorMessage.innerHTML = "You have already added this class";
        return;
      }
    }
    for (let i = 0; i < winter.length; i++) {
      //This loop prevents duplicates for winter table
      if (winter[i].course === input && winter[i].semester === semester) {
        errorMessage.innerHTML = "You have already added this class";
        return;
      }
    }
    for (let i = 0; i < summer.length; i++) {
      //This loop prevents duplicates for summer table
      if (summer[i].course === input && summer[i].semester === semester) {
        errorMessage.innerHTML = "You have already added this class";
        return;
      }
    }

    for (let i = 0; i < classList.length; i++) {
      // Finds if input class exists and stores it in addedClass
      if (classList[i].course === input && classList[i].semester === semester) {
        addedClass = classList[i];
        classExists = true;
        break;
      }
    }

    if (classExists === false) {
      errorMessage.innerHTML = "Invalid Class/Class Not Found";
      return;
    }

    switch (addedClass.semester) {
      case "Fall":
        fall.push(addedClass);
        this.setState({
          selectedCoursesFall: fall,
          showAdd: !this.state.showAdd
        });
        break;
      case "Summer":
        summer.push(addedClass);
        this.setState({
          selectedCoursesSummer: summer,
          showAdd: !this.state.showAdd
        });
        break;
      case "Winter":
        winter.push(addedClass);
        this.setState({
          selectedCoursesWinter: winter,
          showAdd: !this.state.showAdd
        });
        break;
      default:
    }
  };

  removeClass = () => {
    let fall = this.state.selectedCoursesFall; //Keep track of user selected classes for Fall
    let winter = this.state.selectedCoursesWinter; //Keep track of user selected classes for Winter
    let summer = this.state.selectedCoursesSummer; //Keep track of user selected classes for Summer
    let removedFallClass = document.getElementById("select-remove-fall"); //selected value from drop down
    let removedWinterClass = document.getElementById("select-remove-winter"); //selected value from drop down
    let removedSummerClass = document.getElementById("select-remove-summer"); //selected value from drop down
    if (removedFallClass === null) {
      this.setState({
        showRemove: !this.state.showRemove
      });
      return;
    }
    if (
      removedFallClass.value === "Select A Class..." &&
      removedWinterClass.value === "Select A Class..." &&
      removedSummerClass.value === "Select A Class..."
    ) {
      document.getElementById("removeStatus").innerHTML =
        "You have not selected anything.";
      return;
    }
    fall = fall.filter(element => element.course !== removedFallClass.value); //Remove json course object from fall array
    winter = winter.filter(
      element => element.course !== removedWinterClass.value
    ); //Remove json course object from winter array
    summer = summer.filter(
      element => element.course !== removedSummerClass.value
    ); //Remove json course object from summer array
    this.setState({
      selectedCoursesFall: fall,
      selectedCoursesWinter: winter,
      selectedCoursesSummer: summer,
      showRemove: !this.state.showRemove
    });
  };

  // RENDER() HERE *********************************************************

  render() {
    let falltable = (
      <Table id="pdfTable" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Class Name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.selectedCoursesFall.map(element => (
            <tr>
              <td>
                {element.semester} {element.year}
              </td>
              <td>{element.course}</td>
              <td>{element.name}</td>
              <td>{element.credit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    let wintertable = (
      <Table id="pdfTable" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Class Name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.selectedCoursesWinter.map(element => (
            <tr>
              <td>
                {element.semester} {element.year}
              </td>
              <td>{element.course}</td>
              <td>{element.name}</td>
              <td>{element.credit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    let summertable = (
      <Table id="pdfTable" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Class Name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.selectedCoursesSummer.map(element => (
            <tr>
              <td>
                {element.semester} {element.year}
              </td>
              <td>{element.course}</td>
              <td>{element.name}</td>
              <td>{element.credit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    let removeOptions = (
      <Table striped border hover>
        <tr>
          <td>Fall</td>
          <td>Winter</td>
          <td>Summer</td>
        </tr>

        <tr>
          <td>
            <select id="select-remove-fall">
              <option>Select A Class...</option>
              {this.state.selectedCoursesFall.map(element => (
                <option value={element.course}>{element.course}</option>
              ))}
            </select>
          </td>

          <td>
            <select id="select-remove-winter">
              <option>Select A Class...</option>
              {this.state.selectedCoursesWinter.map(element => (
                <option value={element.course}>{element.course}</option>
              ))}
            </select>
          </td>

          <td>
            <select id="select-remove-summer">
              <option>Select A Class...</option>
              {this.state.selectedCoursesSummer.map(element => (
                <option value={element.course}>{element.course}</option>
              ))}
            </select>
          </td>
        </tr>
      </Table>
    );

    let totalNumberOfClasses =
      this.state.selectedCoursesFall.length +
      this.state.selectedCoursesSummer.length +
      this.state.selectedCoursesWinter.length;

    let yeetus = [];
    for (let i = 0; i < 6; i++) {
      /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = new Date().getFullYear() + i;
    }
    const years = yeetus.map(jimmy => <option value={jimmy}>{jimmy}</option>);

    return (
      <div>
        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">
              Sequence To PDF <br /> Year{" "}
              {this.state.selectYear ? "" : this.state.sequenceYear}
            </h2>
            <hr color="#7e1530" />
            <p className="lead">
              Click Add Course and try out COMP248, COMP232, SOEN228 or ENGR213
              to test it out.
              <br />
              <br />
              These 4 classes are only available because this is a test. The
              real json file with all the classes can easily be substituted
              later.
            </p>

            <div className="mt4" id="divToPrint">
              Fall
              {falltable}
              <br />
              Winter
              {wintertable}
              <br />
              Summer
              {summertable}
            </div>
            <Button
              text="Add Course"
              onClick={() => {
                this.setState({ showAdd: !this.state.showAdd });
              }}
            />
            <Button
              text="Remove Course"
              onClick={() => {
                this.setState({ showRemove: !this.state.showRemove });
              }}
            />
            <Button id="mb5" text="PDF" onClick={this.convertToPDF} />
          </div>
        </div>

        <Modal
          show={this.state.showAdd}
          onHide={() => {
            this.setState({ showAdd: !this.state.showAdd });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Add </p> <br />
            <input id="add-class" type="text" />
            <select id="semester">
              <option value="Fall">Fall </option>
              <option value="Winter">Winter</option>
              <option value="Summer">Summer</option>
            </select>
            <p id="addStatus" style={{ color: "red" }} />
            <Button type="submit" text="Add Course" onClick={this.addClass} />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showRemove}
          onHide={() => {
            this.setState({ showRemove: !this.state.showRemove });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Remove </p> <br />
            {totalNumberOfClasses === 0 ? (
              <p>No Classes Have Been Added Yet</p>
            ) : (
              removeOptions
            )}
            <p id="removeStatus" style={{ color: "red" }} />
            <Button
              type="submit"
              text="Remove Course"
              onClick={this.removeClass}
            />
          </Modal.Body>
        </Modal>

        <Modal show={this.state.selectYear}>
          <Modal.Header>
            <Modal.Title>Pick A Year</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <select id="select-year">{years}</select>
            <p id="removeStatus" style={{ color: "red" }} />
            <Button
              type="submit"
              text="Select Year"
              onClick={() => {
                let dooks = document.getElementById("select-year").value; //selected year
                this.setState({
                  sequenceYear: dooks,
                  selectYear: false
                });
              }}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default PdfSequenceGenerator;