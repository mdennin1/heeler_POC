import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
//pages
import HomePage from './pages/homePage/homePage';
import MyPetsPage from './pages/myPetsPage/myPetsPage';
import LoginPage from './pages/loginPage/loginPage';
//components
import Header from './components/header/header';
//utils
import { auth, createUserProfileDocument, firestore } from './firebase/firebase';
//recoil
import { useRecoilState } from 'recoil';
import { loginState } from './recoil/atoms/loginState';
import { myPetsState, selectedPetState } from './recoil/atoms/myPets';
//
const App = () => {
  const [ userInfo, setUserInfo ] = useRecoilState(loginState);
  const [myPets, setMyPets] = useRecoilState(myPetsState);
  const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);
  // const petCollectionRef = firestore.collection('pets');
  const loadPets = userInfo => {
      console.log(`loadPets() fired, userInfo exists? ${!!userInfo}`);
      if(userInfo){
        firestore.collection('pets').where('owner', '==', userInfo?.id)
        .get()
        .then(snapshot=>{
          const petRecords = {};
          snapshot.forEach(doc => petRecords[doc.id] = {...doc.data()});
            // snapshot.forEach(doc=>console.log(JSON.stringify(doc.data())));
            // const petRecords = snapshot.reduce((pets, pet)=>{
            //     pets[pet.id] = {...pet.data()};
            //     return pets;
            // }, {});
            setMyPets(petRecords);
        })
        .catch(error=> console.error(error));
    }
  }
  //
  useEffect(()=>{
    //
    const unsubscribe = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          const userRecord = {id: snapshot.id, ...snapshot.data()};
          setUserInfo(userRecord);
          console.log(`%cuser from App.js: ${JSON.stringify(userInfo)}`, 'color: green');
          loadPets(userRecord);
        });
      }
      setUserInfo(null);
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