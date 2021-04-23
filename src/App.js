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
const App = () => {
  const [ userInfo, setUserInfo ] = useRecoilState(loginState);
  const [myPets, setMyPets] = useRecoilState(myPetsState);
  const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);
  const loadPets = userInfo => {
      console.log(`loadPets() fired, userInfo param ${!!userInfo}`);
      if(userInfo?.id){
          const petsCollectionRef = firestore.collection('pets');
          const myPetsQuery = petsCollectionRef.where('owner', '==', userInfo.id);
          myPetsQuery.onSnapshot(querySnapshot =>{
              const selected_pet = querySnapshot.docChanges()?.find(change => change.type == 'added');
              if(!!selected_pet) setSelectedPet(selected_pet);
              const records = querySnapshot.docs?.reduce((pets, pet)=>{
                  pets[pet.id] = {...pet};
                  return pets;
              }, {});
              console.log(`myPets results from firebase query: ${JSON.stringify(records)}`);
              setMyPets(records);
          });
      }
  }
  useEffect(()=>{
    loadPets(userInfo);
    //
    const unsubscribe = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          setUserInfo({id: snapshot.id, ...snapshot.data()});
          console.log(`%cuser from App.js: ${JSON.stringify(userInfo)}`, 'color: green');
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