
import * as Tone from 'tone';
import storage from '../storage';

let majorChordDescriptions = [];
majorChordDescriptions[1] = {
    label:"1st Major / Root",
    symbol:"I",
    targets:[2,3,4,5,6,7],
    description:"The 1st chord can flow nicely into any other position",
    pos:1
}
majorChordDescriptions[2] = {
    pos:2,
    label:"2nd Minor",
    symbol:"ii",
    targets:[5,7],
    description: "The 2nd chord is a minor chord which adds a sad feeling to the progression"
}

majorChordDescriptions[3] = {
    pos:3,
    label:"3rd minor",
    symbol:"III",
    targets:[6],
    description: "The 3rd chord is a minor chord which adds a sad feeling to the progression, it can only be followed by the 6th which is another sad feeling chord"
}

majorChordDescriptions[4] = {
    pos:4,
    label:"4th Major",
    symbol:"IV",
    targets:[5,7],
    description: "The 4th chord is a Major chord which adds a strong happy feeling to the progression. Many popular songs begin on this chord"
}

majorChordDescriptions[5] = {
    pos:5,
    label:"5th Major",
    symbol:"V",
    targets:[1],
    description:"The 5th chord is a Major chord which adds a strong happy feeling to the progression"
}

majorChordDescriptions[6] = {
    pos:6,
    label:"6th Minor",
    symbol:"vi",
    targets:[2,4],
    description:"The 6th chord is a minor chord which adds a sad feeling to the progression"
}

majorChordDescriptions[7] = {
    pos:7,
    label:"7th Minor Diminished",
    symbol:"vii ∘",
    targets:[1],
    description:"The 7th chord is a diminished minor chord which adds a sad feeling to the progression"
}




let minorChordDescriptions = [];
minorChordDescriptions[1] = {
    pos:1,
    label:"1st Minor / Root",
    symbol:"I",
    targets:[2,3,4,5,6,7],
    description:"The 1st chord can flow nicely into any other position"
}
minorChordDescriptions[2] = {
    pos:2,
    label:"2nd Minor Diminished",
    symbol:"ii ∘",
    targets:[5,7],
    description: "The 2nd chord is a diminished minor chord which adds a sad feeling to the progression"
}

minorChordDescriptions[3] = {
    pos:3,
    label:"3rd Major",
    symbol:"III",
    targets:[6],
    description: "The 3rd chord is a major chord which adds a happy feeling to the progression"
}

minorChordDescriptions[4] = {
    pos:4,
    label:"4th Minor",
    symbol:"iv",
    targets:[5,8],
    description: "The 4th chord is a minor chord which adds a sad feeling to the progression. Many popular songs begin on this chord"
}

minorChordDescriptions[5] = {
    pos:5,
    label:"5th Major",
    symbol:"V",
    targets:[1],
    description:"The 5th chord is a Major chord which adds a strong happy feeling to the progression"
}

minorChordDescriptions[6] = {
    pos:6,
    label:"6th Major",
    symbol:"VI",
    targets:[2,4],
    description:"The 6th chord is a minor chord which adds a happy feeling to the progression"
}

minorChordDescriptions[7] = {
    pos:7,
    label:"7th Minor Diminished",
    symbol:"vii ∘",
    targets:[1],
    description:"The 7th chord is a diminished minor chord which adds a sad feeling to the progression"
}
minorChordDescriptions[8] = {
    pos:8,
    label:"7th Major",
    symbol:"VII",
    targets:[1],
    description:"The 7th Major chord is a chord which adds a happy feeling to the progression"
}

let chromatic = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

//let t = chromatic.slice(chromatic.indexOf("Eb"));
//let s = chromatic.slice(0,chromatic.indexOf("Eb"));
//let e = [...s, ...t]
const initialState = {
    major: majorChordDescriptions,
    minor: minorChordDescriptions,
    chromatic: chromatic,
    keyshift: chromatic,
    key:"C",
    scale:"Major",
    song:[],
    chords:["C","D","E","F","G","A","B"],
    chordSlide:1,
    targetChords:[1,2,3,4,5,6,7],
    scaleModes:{
        "Major":[0,2,2,1,2,2,2],
        "Minor":[0,2,1,2,2,1,2]
    },
    name:"New Song",
    page:"New Song",
    play:()=>{},
    note:"C"


}
Promise.resolve(storage.getState()).then((e)=>{

    console.log(e);
});




function genPlayer(s) {
let f = (state = s)=> {

    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    const now = Tone.now()

    state.song.map((item, index) => {
        console.log(state.chords[item-1])
        
        synth.triggerAttackRelease(state.chords[item-1]+"3", "8n", now+((index)*0.5))
    });
    
   



}

return f;

}

function calcChords(state) {
    let t = chromatic.slice(chromatic.indexOf(state.key));
    let s = chromatic.slice(0,chromatic.indexOf(state.key));
    let shifted = [...t, ...s];

    let walker = 0;

    let scale = state.scaleModes[state.scale].map((item, index)=>{

        walker = parseInt(walker) + parseInt(item);

        return shifted[walker];

    });

    console.log(scale);

    console.log("CALC RETURN IS", {...state,note:shifted[0], chords:scale, keyshift:shifted});

    return {...state,note:shifted[0], chords:scale, keyshift:shifted}


}

function genTargets(state) {



    let desc = [];
    if (state.scale == "Major") {
        desc = majorChordDescriptions;
    } else {
        desc = minorChordDescriptions;
    }

    return desc[state.chordSlide].targets;

}

export default (state = initialState, { type, payload }) => {
console.log(state);
    switch (type) {
    case "GOTO":
        console.log("PAGE CHANGE", payload);

        return {...state, page: payload}
    case "SETCHORDSLIDE":
        console.log("setting slide", payload);
        console.log("setting targetted chord",state.targetChords[payload]);
        return {...state, chordSlide:state.targetChords[payload] }
    case "ADDCHORD":
        let newstate = { ...state,  song:[...state.song,state.chordSlide], play:genPlayer({ ...state, song:[...state.song,state.chordSlide]}) };
        let targetChords = genTargets(newstate);

        return { ...newstate, targetChords:targetChords, chordSlide:targetChords[0]} 

    case "CHANGENAME":
        return { ...state, name: payload }
    case "LOADSONG":
        console.log("LOAD SONG", payload);

        return {...payload, page:"Edit Song",  play:genPlayer({ ...payload})}
    case "CHANGEKEY":
        
        return calcChords({ ...state, key: payload })
    case "CHANGESCALE":
        return calcChords({ ...state, scale: payload })
  

    default:
        return state
    }
}