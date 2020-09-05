import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import WineRecommendations from '../pages/Dashboard/WineRecommendations';
import CustomersHighestPurchasesYear from '../pages/Dashboard/CustomersHighestPurchasesYear';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route
      path="/dashboard/wines/recommendation/:customerCpf"
      component={WineRecommendations}
    />
    <Route
      path="/dashboard/customers/purchases/highest/:year"
      component={CustomersHighestPurchasesYear}
    />
  </Switch>
);

export default Router;
