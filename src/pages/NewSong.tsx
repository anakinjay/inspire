import { IonButton, IonSelect, IonSelectOption, IonLabel, IonItem, IonInput, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, {useRef} from 'react';


import './Page.css';

import { connect } from 'react-redux'


const mapStateToProps = (state:  any) => ({ scale: state.scale })


const NewSong: React.FC = (props: any) => {



  console.log("PROPS IS", props);

  
  let notes = props.scale.chromatic.map((item: any, index: any) => {
    return <IonSelectOption key={index} value={item}>{item}</IonSelectOption>
  })

  return (
    <div>
          <IonItem>
            <IonLabel position="floating">Song Name</IonLabel>
            <IonInput onIonChange={props.changeName} color="primary"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Key</IonLabel>
            <IonSelect  onIonChange={props.changeKey}  value={props.scale.key} okText="Okay" cancelText="Dismiss" >
              {notes}
                     </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Scale</IonLabel>
            <IonSelect  onIonChange={props.changeScale} value={props.scale.scale} okText="Okay" cancelText="Dismiss" >
              <IonSelectOption value="Major">Major</IonSelectOption>
              <IonSelectOption value="Minor">Minor</IonSelectOption>
                          </IonSelect>
          </IonItem>
          <IonButton onClick={()=>{props.goto("Edit Song")}}   expand={"block"} color="primary">Start New Song</IonButton>
    </div>
  );
};


const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  console.log("Dispatch Fired");
  return {
    // dispatching plain actions
    goto: (payload: any) => {
      
      dispatch({ type: 'GOTO', payload: payload });
},
    changeName: (payload: any) => {
      
          dispatch({ type: 'CHANGENAME', payload: payload.detail.value });
    },
    changeKey: (payload: any) => {
      dispatch({ type: 'CHANGEKEY', payload: payload.detail.value });
    },
    changeScale: (payload: any) => {
      dispatch({ type: 'CHANGESCALE', payload: payload.detail.value });
},
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSong);
