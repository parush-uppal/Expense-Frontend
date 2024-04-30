import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ContentDetails from "../../components/ContentDetails/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";

import LoadingComponent from "../../components/Loading/Loading";
import AppPagination from "../../components/Pagination/AppPagination";
import { fetchIncomesAction } from "../../redux/slices/income/incomeSlices";

const IncomeList = ({ location: { state } }) => {
  const [page, setPage] = useState(1);
  const users = useSelector(state => state?.users);
  const dispatch = useDispatch();
  //hide some table tabs to display user income information
  const dataType = state?.data;
  useEffect(() => {
    dispatch(fetchIncomesAction(page));
  }, [page]);
  const income = useSelector(state => state?.income);
  const { incLoading, incomeList, incAppErr, incServerErr } = income;

  const history = useHistory();
  // const navigate = expense => {
  //   history.push({
  //     pathname: "/edit",
  //     state: {
  //       data,
  //     },
  //   });
  // };
  return (
    <>
      {incLoading ? (
        <LoadingComponent />
      ) : incAppErr || incServerErr ? (
        <ErrorDisplayMessage>
          {incServerErr} {incAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Income transactions</h6>
                <p className="mb-0">
                  Below is the history of your income transactions records
                </p>
                <Link to="/add-income" className="btn  btn-success me-2 m-2">
                  New Income
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    {!dataType && (
                      <th scope="col">
                        <button className="btn d-flex align-items-centerr text-uppercase">
                          <small className="text-center">Deposited By</small>
                        </button>
                      </th>
                    )}
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incomeList?.length <= 0 ? (
                    <h2>No Income Found</h2>
                  ) : (
                    incomeList?.docs?.map(exp => (

                      users.userAuth._id === exp.user.id ?
                      <ContentDetails
                        dataType={dataType}
                        item={exp}
                        key={exp?._id}
                      /> : ""
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {incomeList?.docs?.length > 1 && (
              <AppPagination setPage={setPage} items={incomeList?.totalPages} />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default IncomeList;
