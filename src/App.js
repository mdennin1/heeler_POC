import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
//pages
import HomePage from './pages/homePage/homePage';
import MyPetsPage from './pages/myPetsPage/myPetsPage';
import LoginPage from './pages/loginPage/loginPage';
//components
import Header from './components/header/header';
//utils
// import { auth } from './firebase/firebase';
function App() {
  // const [currentUser, setCurrentUser] = useState();
  // useEffect(()=>{
  //   const unsubscribe = auth.onAuthStateChanged(user =>setCurrentUser(user));
  //   console.log(currentUser);
  //   return unsubscribe;
  // }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/my_pets" component={MyPetsPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}
export default App;