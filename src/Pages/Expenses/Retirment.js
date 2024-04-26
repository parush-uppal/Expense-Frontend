import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import { useHistory } from "react-router-dom";
import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
import DisabledButton from "../../components/DisabledButton";
import redirectUser from "../../utils/redirect";
import navigate from "../../utils/navigate";

//Form validation
const formSchema = Yup.object({
  currentAge: Yup.number().required("Age is required"),
  retirementAge: Yup.number().required("Retirement Age is required"),
  monthlySalary: Yup.number().required("Salary is required"),
  monthlyExpense: Yup.number().required("Expense is required"),
  inflationRate: Yup.number().required("Inflation Rate is required"),
});

const Retirment = () => {
  //dispatch action
  const dispatch = useDispatch();
  const history = useHistory();




    const [financialInfo, setFinancialInfo] = useState({
        currentAge: 0,
        retirementAge: 0,
        monthlySalary: 0,
        monthlyExpense: 0,
        inflationRate: 0,
    });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFinancialInfo({ ...financialInfo, [name]: value });
  };


  

//   --------YAHA SE KRNA HAI---------
  const [currentAge, setCurrentAge] = useState(financialInfo.currentAge);
  const [retirementAge, setRetirementAge] = useState(financialInfo.retirementAge);
  const [monthlySalary, setMonthlySalary] = useState(financialInfo.monthlySalary);
  const [monthlyExpense, setMonthlyExpense] = useState(financialInfo.monthlyExpense);
  const [inflationRate, setInflationRate] = useState(financialInfo.inflationRate);
  const [tableData, setTableData] = useState([]);
  //income
  //expense


  
  useEffect(() => {
    setCurrentAge(financialInfo.currentAge);
 }, [financialInfo.currentAge]);

 useEffect(() => {
    setRetirementAge(financialInfo.retirementAge);
}, [financialInfo.retirementAge]);

useEffect(() => {
    setMonthlySalary(financialInfo.monthlySalary);
}, [financialInfo.monthlySalary]);

useEffect(() => {
    setMonthlyExpense(financialInfo.monthlyExpense);
}, [financialInfo.monthlyExpense]);

useEffect(() => {
    setInflationRate(financialInfo.inflationRate);
}, [financialInfo.inflationRate]);






  const expenses = useSelector(state => state?.expenses);
  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;
  //initialize form
  const formik = useFormik({
    initialValues: {
      currentAge:"",
      retirementAge: "",
      monthlySalary: "",
      monthlyExpense: "",
      inflationRate: "",
    },
    onSubmit: values => {
      dispatch(addNewExpAction(values));
    },
    validationSchema: formSchema,
  });
  const handelClick = async (e) => {
    e.preventDefault();
    generateRetirementTable()
    

  };
  
  const generateRetirementTable = () => {
    // Calculate total years to retirement
    const yearsToRetirement = financialInfo.retirementAge - financialInfo.currentAge;

    // Initialize variables for table
    const data = [];
    let totalSaved = 0;

    // Loop through each year until retirement
    for (let year = 1; year <= yearsToRetirement; year++) {
      // Calculate annual salary considering savings goal (replace with your formula)
      const annualSalary = financialInfo.monthlySalary * 12 * (1 + financialInfo.inflationRate) ** year;

      // Calculate annual expense considering inflation
      const annualExpense = financialInfo.monthlyExpense * 12 * (1 + financialInfo.inflationRate) ** year;

      // Calculate annual savings (salary minus expense)
      const annualSavings = annualSalary - annualExpense;

      // Update total saved across years
      totalSaved += annualSavings;

      // Push data for each year into the table
      data.push({
        year,
        annualSalary,
        annualSavings,
        annualExpense,
        totalSaved: totalSaved, // Multiply by 12 to get yearly total saved
      });
    }

    // Set the generated table data into state
    //console.log(data)
    setTableData(data);
    navigate(history, "table", data);
  };

  useEffect(() => {
    if (isExpCreated) {
      navigate(history, "user-profile-expenses", undefined);
    }
  }, [isExpCreated]);
  return (
    <>
      <section className="py-5 bg-info vh-105">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            />
          </a>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Income</span>
                  <h2 className="mb-4 fw-light">Predict Savings</h2>
                  {/* Display income Err */}
                  {expServerErr || expAppErr ? (
                    <div className="alert alert-danger" role="alert">
                      {expServerErr} {expAppErr}
                    </div>
                  ) : null}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.currentAge}
                      onBlur={formik.handleBlur("currentAge")}
                      onChange={formik.handleChange("currentAge")}
                      className="form-control"
                      type="number"
                      placeholder="Enter CurrentAge"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.retirementAge}
                      onBlur={formik.handleBlur("retirementAge")}
                      onChange={formik.handleChange("retirementAge")}
                      className="form-control"
                      type="number"
                      placeholder="Enter RetirementAge"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.description && formik.errors.description}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.monthlySalary}
                      onBlur={formik.handleBlur("monthlySalary")}
                      onChange={formik.handleChange("monthlySalary")}
                      className="form-control"
                      type="number"
                      placeholder="Enter MonthlySalary"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.monthlyExpense}
                      onBlur={formik.handleBlur("monthlyExpense")}
                      onChange={formik.handleChange("monthlyExpense")}
                      className="form-control"
                      type="number"
                      placeholder="Enter MonthlyExpense"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.inflationRate}
                      onBlur={formik.handleBlur("inflationRate")}
                      onChange={formik.handleChange("inflationRate")}
                      className="form-control"
                      type="number"
                      placeholder="Enter InflationRate"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                  {expLoading ? (
                    <DisabledButton />
                  ) : (
                    <button onClick={handelClick} type="submit" className="btn btn-danger mb-4 w-100">
                      Predict Savings
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Retirment;
