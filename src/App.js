import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
//pages
import HomePage from './pages/homePage/homePage';
import MyPetsPage from './pages/myPetsPage/myPetsPage';
import LoginPage from './pages/loginPage/loginPage';
//components
import Header from './components/header/header';
//utils
import { auth, createUserProfileDocument } from './firebase/firebase';
//recoil
import { useRecoilState } from 'recoil';
import { loginState } from './recoil/atoms/loginState';
const App = () => {
  const [ user, setUser ] = useRecoilState(loginState);
  useEffect(()=>{
    //
    const unsubscribe = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          setUser({id: snapshot.id, ...snapshot.data()});
          console.log(`%cuser from App.js: ${JSON.stringify(user)}`, 'color: green');
        });
      }
      setUser(null);
    });
    return unsubscribe;
  }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/my_pets" component={MyPetsPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}
export default App;