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
function App() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          console.log(`%ccurrent user snapshot: ${JSON.stringify(snapshot.data())}`, 'color: green');
          setCurrentUser({...snapshot.data()})
        });
      }
      setCurrentUser(null);
    });
    console.log(`currentUser: ${JSON.stringify(currentUser)}`);
    return unsubscribe;
  }, []);
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