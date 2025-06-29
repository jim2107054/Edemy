import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = useContext(AppContext);

  //For now, we will store the dummy data in the state from assets file
  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 p-4 md:p-8 md:pb-0 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          {/*-------------Total Enrolled Students---------*/}
          <div className="flex items-center gap-3 shadow-card border border-blue-600 p-3 w-52 rounded-md">
            <img className="w-12" src={assets.patients_icon} alt="student" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-base text-gray-500">Total Enrolments</p>
            </div>
          </div>
          {/*-------------Total Courses---------*/}
          <div className="flex items-center gap-3 shadow-card border border-blue-600 p-3 w-52 rounded-md">
            <img
              className="w-12"
              src={assets.appointments_icon}
              alt="student"
            />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>
          {/*-------------Total Revenue---------*/}
          <div className="flex items-center gap-3 shadow-card border border-blue-600 p-3 w-52 rounded-md">
            <img className="w-12" src={assets.earning_icon} alt="student" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalEarnings}
                {" " + currency}
              </p>
              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>
        {/*-------------Enrolled Students---------*/}
        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    Student Name
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    Course Title
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-500/20 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        className="w-9 h-9 rounded-full"
                        src={item.student.imageUrl}
                        alt="profile"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
