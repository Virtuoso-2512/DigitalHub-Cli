import { useEffect, useState } from "react";
import toast from "../controllers/Alert";
import Button from "../components/button";
import { GlobalState } from "../GlobalParent";
import Input from "../components/input";
import Switch from "../components/switch";
import Select from "../components/select";
import Popup from "../components/Popup";
import "./calendar.css";

export default function Calendar() {
  const today = new Date(), {get, userLevel, theme} = GlobalState();
  const [event, setEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [monthPicker, setMonthPicker] = useState(false);
  const [currM, setCurrM] = useState(today.getMonth()), [currY, setCurrY] = useState(today.getFullYear());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  useEffect(async() => {
    if(monthPicker) return;
    
    const ev = await get("calendar?month="+currM);
    setEvents(ev.events);
    generateCalendar(currM, currY)
  }, [currM, monthPicker])

  const next = () => {
    setCurrM((currM + 1) % 12);
    if(currM === 11) setCurrY(currY+1);
  }, 
  previous = () => {
    setCurrM(currM === 0 ? 11 : currM - 1);
    if(currM === 0) setCurrY(currY-1);
  }, 
  isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
  },
  getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
  },
  getCalendarDays = () => {
    const month = currM, year = currY;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Dates from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({ day, isCurrentMonth: false, isToday: false });
    }

    // Dates from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      days.push({ day, isCurrentMonth: true, isToday });
    }

    // Dates from next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const remainingCells = 42 - days.length; // Assuming 6 rows in the calendar
    for (let i = 1; i <= remainingCells; i++) {
      const day = i;
      days.push({ day, isCurrentMonth: false, isToday: false });
    }

    return days;
  };

  const generateCalendar = (month, year) => {
    let calendar = document.querySelector('.calendar');
    let calendar_days = calendar.querySelector('.calendar-days');
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    // get first day of month
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
  };
  
  const firstDay = new Date(currY, currM, 1).getDay();
  const daysInMonth = new Date(currY, currM + 1, 0).getDate();
  const calendar = [];

  for (let i = 0; i < firstDay; i++) calendar.push(<td key={`empty-${i}`} className="empty-cell" />);

  for (let day = 1; day <= daysInMonth; day++) calendar.push( <td key={`day-${day}`} className="calendar-day"> {day} </td> );

  const calendarDays = getCalendarDays();
  const coloors = ["#bb0a1e","#009b00","#ffd300"];

  const checkDate = (date) => {
    for (let i = 0; i < events.length; i++) {
        if (events[i].date === date) {
            return [true, events[i]];
        }
    }
    return [false, []];
  }

  const weeks = [];
  let week = [];

  calendarDays.forEach((day, index) => {
    const { isCurrentMonth, isToday } = day;
    const className = isCurrentMonth ? 'calendar-day' : 'other-month-day';
    const dayClassName = isToday ? 'calendar-today' : '';
    week.push(
      <th key={`day-${index}`} className={className + " " + dayClassName}>
        {day.day}
        {checkDate(day.day)[0] && isCurrentMonth ? <div style={{background: coloors[checkDate(day.day)[1]["type"]] ||  "var(--gradient)",borderRadius:"20px",width:"15px",height:"3px",margin:0}}/> : <div/>}
      </th>
    );

    if ((index + 1) % 7 === 0) {
      weeks.push(<tr key={`week-${index / 7}`}>{week}</tr>);
      week = [];
    }
  });

  if (week.length > 0) {
    weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
  }

  return <main id="calendar-main">
    <div className={"holder " + (theme === "light" ? "light" : "dark")}>

        <div className="calendar">
          {monthPicker ? <div className={"month-list " + (monthPicker ? "show" : "")}>
            {Array.from({ length: 51 }, (x, i) => i+2007).map(year => <div className={year === currY ? "curr" : ""}><div data-month={year} onClick={()=>{setCurrY(year);setMonthPicker(false)}}>{year}</div></div>)}
          </div> : <>
              <div id="start" className="start">
                <Button style={{marginLeft:0}} variant={8} onClick={previous}><i className="fa-solid fa-caret-left"/></Button>
                <h3 style={{margin:"5px 0 5px 0",fontFamily:"Poppins",width:"6vw",textAlign:"center"}}>{months[currM]}</h3>
                <Button variant={8} onClick={next}><i className="fa-solid fa-caret-right"/></Button>

                <Button variant={8} style={{margin:"5px 0 5px auto"}} onClick={()=>setMonthPicker(!monthPicker)}><h2 style={{color:"var(--color)",margin:0}}>{currY}</h2></Button>
              </div>
              
            <div class="calendar-body">
              <div class="calendar-week-day">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
              </div>
              <div class="calendar-days"></div>
            </div>
          </>}
        </div>

        {true ? null : <NewEvent months={months}/>}
        <div style={{display:"flex",flexDirection:"column",width:"65vw",height:'100%'}}>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"65vw"}}>
            <h2 style={{fontFamily:"Poppins"}}>Events</h2>
            {userLevel === 0 ? <Button variant={6} onClick={()=>setEvent(!event)}><i className="fas fa-plus" style={{transform:event ? "rotate(45deg)" : "", transition:"all .5s ease"}}/> Add Event</Button> : null}
          </div>
          {events.map(event => <EventBar month={months[currM]} event={event}/>)}
        </div>
    </div>
  </main>;
}

function EventBar({month, event}){
  const [mouse, setMouse] = useState(false);
  const [open, setOpen] = useState(false);

  return <>
  <Popup open={open} setOpen={setOpen} title={new Date(event.date).getDate() + " " +  month + " - " + event.name}>
    <EventDetails Close={()=>setOpen(false)} id={event._id}/>
  </Popup>
  <div style={{display:"flex",alignItems:"center",flexDirection:"row",minHeight:"70px"}} onMouseLeave={()=>setMouse(false)} onMouseEnter={()=>setMouse(true)}>
  <h5 style={{fontFamily:"Poppins"}}>{new Date(event.date).getDate()} {month}</h5>
  <div style={{width:"5px",height:"60%",margin:"5px 2vw", background:"var(--gradient)",borderRadius:"25px"}}></div>
  <h4>{event.name}</h4>
  {mouse ? <Button variant={6} style={{marginLeft:"auto"}} onClick={()=>setOpen(true)}><i className="fas fa-info-circle"/></Button>: <div style={{minHeight:"55px",minWidth:"10px"}}/>}
</div><div style={{width:"97%",height:"3px",margin:"5px", background:"var(--gradient-light)",borderRadius:"25px"}}></div></>
}

function EventDetails({id, Close}){
  const [stu, setStu] = useState(false), [emp, setEmp] = useState(false), {get,userLevel} = GlobalState();

  useEffect(async() => {
    const evdt = await get("calendar/dt?id="+id);
    setStu(evdt.students ? true : false);
    setEmp(evdt.employees ? true : false);
  }, []);

  const Delete = async() => {
    const evd = await get("calendar/d?id="+id);
    Close();
    if(evd.success) return toast("Event Deleted Successfully !", 1);
    return toast("Error in Event Deletion !");
  }
  
  return <div style={{fontFamily:"Poppins"}}>
    <h5>Is it Holiday for Students : <code>{stu ? "Yes" : "No"}</code></h5>
    <h5>Is it Holiday for Employees : <code>{emp ? "Yes" : "No"}</code></h5>
    {userLevel === 0 ? <Button variant={5} onClick={Delete}>Delete Event ?</Button> : null}
  </div>
}

function NewEvent({months}){
  const currentYear = new Date().getFullYear(), {username, post} = GlobalState();
  const [eventname, setEventname] = useState("");
  const [student, setStudent] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [dates, setDates] = useState([]);
  
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [dateString, setDateString] = useState('');

  // Populate day options based on selected month
  function populateDays() {
    let year = currentYear;
    if (parseInt(selectedMonth) <= 3) {
      year++;
    }
    const daysInMonth = new Date(year, parseInt(selectedMonth), 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    setDates(days)
  }

  // Get selected date and display it
  function getSelectedDate() {
    let year = currentYear;
    if (parseInt(selectedMonth) <= 3) {
      year++;
    }

    // Handle leap year
    if (parseInt(selectedMonth) === 2 && parseInt(selectedDay) === 29 && !isLeapYear(year)) {
      alert('Selected date is invalid in a non-leap year!');
      return;
    }

    console.log(selectedDay);

    const date = new Date(year, parseInt(selectedMonth) - 1, parseInt(selectedDay));
    const dateString = date.toDateString();
    setDateString(dateString);
  }

  useEffect(() => getSelectedDate(), [selectedDay, selectedMonth])
  useEffect(() => populateDays(), [selectedMonth])
  
  // Function to check if a year is a leap year
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  const createEvent = async() => {
    let year = currentYear;
    if (parseInt(selectedMonth) <= 3) {
      year++;
    }

    // Handle leap year
    if (parseInt(selectedMonth) === 2 && parseInt(selectedDay) === 29 && !isLeapYear(year)) {
      alert('Selected date is invalid in a non-leap year!');
      return;
    }

    const date = new Date(year, parseInt(selectedMonth) - 1, parseInt(selectedDay));

    const tosend = {
      name:eventname,
      date,
      holiday:{
        employees:employee,
        students:student,
      }
    }

    const newEv = await post("calendar", tosend);
    if(!newEv.success) return toast("Error in Creating new Event !");
    
    setEventname("");
    setSelectedDay(0);
    setSelectedMonth(0);
    setStudent(false);
    setEmployee(false);
    return toast("New Event Created !", 1);
  }

  return <div style={{display:"flex",flexDirection:"column",alignItems:"left",width:"62vw"}}>
    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between "}}>
      <h2 style={{fontFamily:"Poppins"}}>Add Event for {username}</h2>
      <Button variant={4} disabled={!eventname || typeof selectedDay === "number" || typeof selectedMonth === "number"} onClick={createEvent}>Add Event to Calendar</Button>
    </div>
    <Input label="Event Name" value={eventname} onChange={setEventname} style={{width:"550px"}}/>
    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"5vh"}}>
      <h3>Select Date <span style={{fontFamily:"Poppins"}}>{dateString}</span></h3>
      <p><i className="fas fa-info-circle"/> You can Add Events/Holidays Only for the Ongoing Academic Year !</p>
    </div>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <Select style={{width:"200px"}} label="Date" value={selectedDay} setOption={setSelectedDay} options={dates} oav/>
      <Select style={{width:"200px"}} label="Month" value={selectedMonth} setOption={setSelectedMonth} def2={1} options={months}/>
    </div>
    
    <div style={{marginTop:"5vh",display:"flex",flexDirection:"row",justifyContent:"space-between "}}>
      <HolidaySelector onChange={setStudent} state={student} name={eventname} val="Students"/>
      <HolidaySelector onChange={setEmployee} state={employee} name={eventname} val="Employees"/>
    </div>

  </div>
}

function HolidaySelector({name, state, onChange, val}){
  return <div>
    <h4>Is <code>{name || "Event Name"}</code> Holiday for {val} ? </h4>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <h4 style={{marginRight:"10px",color:state?"":"#1972d6"}}>No</h4>
      <Switch state={state} onChange={onChange}/>
      <h4 style={{marginLeft:"10px",color:state?"#1972d6":""}}>Yes</h4>
    </div>
  </div>
}