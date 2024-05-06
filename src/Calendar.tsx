import { useState } from "react";
import {
    format,
    subMonths,
    addMonths,
    startOfWeek,
    addDays,
    isSameDay,
    lastDayOfWeek,
    getWeek,
    addWeeks,
    subWeeks
} from "date-fns";
import ViewMore from "./components/ViewMore";

const Calendar = ({ showDetailsHandle, classesData }: any) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedValue, setSelectedValue] = useState<any>()

    const [viewModal, setViewModal] = useState(false)


    const handleViewMoreInfo = (classItem: any) => {
        // alert(JSON.stringify(classItem))
        setSelectedValue(classItem)
        setViewModal((prev) => !prev)
    }

    // const changeMonthHandle = (btnType: any) => {
    //     if (btnType === "prev") {
    //         setCurrentMonth(subMonths(currentMonth, 1));
    //     }
    //     if (btnType === "next") {
    //         setCurrentMonth(addMonths(currentMonth, 1));
    //     }
    // };

    const changeWeekHandle = (btnType: any) => {
        //console.log("current week", currentWeek);
        if (btnType === "prev") {
            //console.log(subWeeks(currentMonth, 1));
            setCurrentMonth(subWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
        }
        if (btnType === "next") {
            //console.log(addWeeks(currentMonth, 1));
            setCurrentMonth(addWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
        }
    };

    const onDateClickHandle = (day: any, dayStr: any) => {
        setSelectedDate(day);
        showDetailsHandle(dayStr);
    };

    const renderHeader = () => {
        const dateFormat = "MMM yyyy";
        // console.log("selected day", selectedDate);
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month
          </div> */}
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end">
                    {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };

    const renderCells = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";


        while (day <= endDate) {
            console.log("dateformat", day)
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                days.push(
                    <div
                        className={`col cell ${isSameDay(day, new Date())
                            ? "today"
                            : isSameDay(day, selectedDate)
                                ? "selected"
                                : ""
                            }`}
                        key={day.toDateString()}
                        onClick={() => {
                            const dayStr = format(cloneDay, "ccc dd MMM yy");
                            onDateClickHandle(cloneDay, dayStr);
                        }}
                    >
                        <span className="number">{formattedDate}</span>
                        {/* <span className="bg">{formattedDate}</span> */}


                        {classesData && classesData

                            .filter((classItem: any) => {
                                const currentDate = day;
                                const classItemDate = new Date(classItem.time.split('T')[0]);
                                return classItemDate.getDate() === currentDate.getDate() &&
                                    classItemDate.getMonth() === currentDate.getMonth() &&
                                    classItemDate.getFullYear() === currentDate.getFullYear();
                            })
                            .map((classItem: any, index: number) => (
                                <div className="flex flex-col" key={index}>
                                    <div className="text-sm" onClick={() => handleViewMoreInfo(classItem)}>
                                        <p className="bg-blue-50 rounded-r-lg text-start m-1 p-2">{classItem.classType}</p>
                                    </div>
                                </div>
                            ))}

                    </div>
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div className="row" key={day.toDateString()}>
                    {days}

                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };
    const renderFooter = () => {
        return (
            <div className="header row flex-middle">
                <div className="col col-start text-[#242424] ">
                    <div className="icon bg-blue-300 rounded-lg p-3" onClick={() => changeWeekHandle("prev")}>
                        prev week
                    </div>
                </div>
                <div>{currentWeek}</div>
                <div className="col col-end " onClick={() => changeWeekHandle("next")}>
                    <div className="icon text-[#242424] bg-blue-300 rounded-lg p-3">next week</div>
                </div>
            </div>
        );
    };
    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            {renderFooter()}
            {
                viewModal ? <ViewMore selectedValue={selectedValue} setViewModal={setViewModal} setSelectedValue={setSelectedValue} /> : null
            }
        </div>
    );



};

export default Calendar;
