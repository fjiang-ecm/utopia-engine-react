import * as actionTypes from '../actions/actionTypes';


const initialState = {
    id: -1,
    name: "",
    color: "",
    monster: "",
    level: "",
};

const updateRegion = (state, action) => {
    return {
        ...state,
        id: action.id,
        name: action.region,
        color: action.color,
    };
};

const updateMonster = (state, action) => {
    return {
        ...state,
        level: action.level,
        monster: action.monster,
    };
};

const updateArtifact = (state, action) => {
    return {
        ...state,
        id: action.id,
        artifact: action.artifact,
        color: action.color,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_REGION: return updateRegion(state, action);
        case actionTypes.UPDATE_MONSTER: return updateMonster(state, action);
        case actionTypes.UPDATE_ARTIFACT: return updateArtifact(state, action);
        case actionTypes.FAINT: return initialState;
        case actionTypes.GAME_OVER: return initialState;
        default: return state;
    }
};

export default reducer;
