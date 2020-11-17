import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { connect } from 'react-redux'



const appPages = [
  {
    title: 'New Song',
    url: '/page/New Song',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Load Song',
    url: '/page/Load Song',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  }
];

 

const Menu = (props) => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inspire</IonListHeader>
          <IonNote>Music Progression Calculator</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem onClick={()=>{props.goto(appPage.title)}} className={location.pathname === appPage.url ? 'selected' : ''}  lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

       
      </IonContent>
    </IonMenu>
  );
};

const mapDispatchToProps = (dispatch) => {
  console.log("Dispatch Fired");
  return {
    // dispatching plain actions
    goto: (payload) => {
      
      dispatch({ type: 'GOTO', payload: payload });
},
    changeName: (payload) => {
      
          dispatch({ type: 'CHANGENAME', payload: payload.detail.value });
    },
    changeKey: (payload) => {
      dispatch({ type: 'CHANGEKEY', payload: payload.detail.value });
    },
    changeScale: (payload) => {
      dispatch({ type: 'CHANGESCALE', payload: payload.detail.value });
},
    
  }
}

const mapStateToProps = (state) => ({ scale: state.scale })
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

