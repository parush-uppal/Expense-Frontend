import { BrowserRouter, Route, Switch } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import NewRecord from "./components/Add/NewRecordForm";
import Home from "./Pages/Home";

import IncomeList from "./Pages/Income/IncomeList";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./Pages/Users/Profile/Profile";
import Register from "./Pages/Users/Register/Register";
import Login from "./Pages/Users/Login/Login";
import ExpensesList from "./Pages/Expenses/ExpensesList";
import Dashboard from "./Pages/Dashboard/Dashboard";

import EditContent from "./components/EditContent/EditContent";
import UserProfileExpList from "./Pages/Users/Profile/UserProfileExpList";
import UserProfileIncList from "./Pages/Users/Profile/UserProfileIncList";
import UpdateProfile from "./Pages/Users/Profile/UpdateProfile";
import AddIncome from "./Pages/Income/AddIncome";
import AddExpense from "./Pages/Expenses/AddExpense";
import PrivateProtectRoute from "./components/Navigation/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/AdminRoute";
import NotAdmin from "./components/NotAdmin/NotAdmin";
import Retirment from "./Pages/Expenses/Retirment";
import Table from "./Pages/Expenses/Table";

const options = {
  timeout: 50000,
  position: positions.BOTTOM_CENTER,
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <AdminRoute exact path="/dashboard" component={Dashboard} />
          <PrivateProtectRoute
            exact
            path="/user-profile-expenses"
            component={UserProfileExpList}
          />
          <Route
            exact
            path="/user-profile-income"
            component={UserProfileIncList}
          />
          <Route exact path="/not-admin" component={NotAdmin} />

          <PrivateProtectRoute
            exact
            path="/update-profile"
            component={UpdateProfile}
          />

          <PrivateProtectRoute exact path="/edit" component={EditContent} />
          {/* <PrivateProtectRoute
            exact
            path="/user-expenses"
            component={UserExpenses}
          /> */}
          <PrivateProtectRoute
            exact
            path="/add-expense"
            component={AddExpense}
          />
          <PrivateProtectRoute exact path="/add-income" component={AddIncome} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateProtectRoute exact path="/profile" component={Profile} />
          <PrivateProtectRoute exact path="/incomes" component={IncomeList} />
          <PrivateProtectRoute exact path="/savings" component={Retirment} />
          <PrivateProtectRoute exact path="/table" component={Table} />
          <PrivateProtectRoute
            exact
            path="/expenses"
            component={ExpensesList}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
