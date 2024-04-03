import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardData from "../../components/Dashboard/DashboardData";
import LoadingComponent from "../../components/Loading/Loading";
import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, []);
  const statistics = useSelector(state => state.statistics);
  const { statsLoading, appErr, serverErr, stats } = statistics;
  console.log({ statsLoading, appErr, serverErr, stats });
  const exp = stats?.expensesStats[0];
  const inc = stats?.incomeStats[0];
  console.log(exp);

  return (
    <>
      {/* <h1>NET: {stats?.profit}</h1>
      <DashboardData
        numOfTransExp={exp?.totalRecords}
        avgExp={exp?.averageExp}
        totalExp={exp?.totalExp}
        minExp={exp?.minExp}
        maxExp={exp?.maxExp}
        numOfTransInc={inc?.totalRecords}
        avgInc={inc?.averageInc}
        totalInc={inc?.totalInc}
        minInc={inc?.minInc}
        maxInc={inc?.maxInc}
      /> */}

      {statsLoading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <div class="alert alert-danger" role="alert">
          {serverErr} {appErr}
        </div>
      ) : (
        <>
          <DashboardData
            numOfTransExp={exp?.totalRecords}
            avgExp={exp?.averageExp}
            totalExp={exp?.totalExp}
            minExp={exp?.minExp}
            maxExp={exp?.maxExp}
            numOfTransInc={inc?.totalRecords}
            avgInc={inc?.averageInc}
            totalInc={inc?.totalInc}
            minInc={inc?.minInc}
            maxInc={inc?.maxInc}
            netProfit={stats?.profit}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
