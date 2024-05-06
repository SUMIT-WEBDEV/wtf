import "./styles.css";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Details from "./Details";
import useClassData from "./hooks/useClassData";

export default function Home() {
    const classData = useClassData();

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);
    const [filterClassData, setFilterClassData] = useState<any>(classData);
    const [fitnessType, setFitnessType] = useState<string | undefined>();
    const [instructor, setInstructor] = useState<string | undefined>();
    const [dayTime, setDayTime] = useState<string | undefined>();

    const fitnessData: string[] = ["Yoga", "Cardio", "Strength Training"];
    const instructorData: string[] = ["Priya Patel", "Rajesh Kumar", "Neha Sharma", "Rahul Singh", "Anjali Gupta"];

    const showDetailsHandle = (dayStr: any) => {
        setData(dayStr);
        setShowDetails(true);
    };

    useEffect(() => {
        let filteredData = classData;
        if (fitnessType) {
            filteredData = filteredData.filter((item: any) => item.classType.toLowerCase() === fitnessType.toLowerCase());
        }
        if (instructor) {
            filteredData = filteredData.filter((item: any) => item.instructor.toLowerCase() === instructor.toLowerCase());
        }
        if (dayTime) {
            filteredData = filteredData.filter((item: any) => {
                const time = new Date(item.time).getHours();
                if (dayTime === "morning") {
                    return time >= 6 && time < 12;
                } else if (dayTime === "afternoon") {
                    return time >= 12 && time < 18;
                } else if (dayTime === "evening") {
                    return time >= 18 && time <= 23;
                }
                return false;
            });
        }
        setFilterClassData(filteredData);
    }, [classData, fitnessType, instructor, dayTime]);


    return (
        <div className="App w-full flex ">
            <div className="w-5/6 m-auto ">
                <h1 className="lg:text-4xl text-2xl text-white font-bold ">WTF: Your Fitness Class Scheduler</h1>
                <br />
                <div className="space-x-5 contain-content">
                    <select value={fitnessType} onChange={(e) => setFitnessType(e.target.value)} className="p-2 rounded-md my-2">
                        <option value="">Select Fitness Type</option>
                        {fitnessData.map((item, index) => (
                            <option key={index} value={item.toLowerCase()}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select value={instructor} onChange={(e) => setInstructor(e.target.value)} className="p-2 rounded-md my-2">
                        <option value="">Select Instructor</option>
                        {instructorData.map((item, index) => (
                            <option key={index} value={item.toLowerCase()}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select value={dayTime} onChange={(e) => setDayTime(e.target.value)} className="p-2 rounded-md my-2">
                        <option value="">Select Day Time</option>
                        <option value="morning">Morning (6 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                        <option value="evening">Evening (6 PM - 12 AM)</option>
                    </select>
                </div>

                <Calendar showDetailsHandle={showDetailsHandle} classesData={filterClassData} />
                <br />
                {showDetails && <Details data={data} />}
            </div>
        </div>
    );
}
