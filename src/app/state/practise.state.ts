import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Practise } from '../models/Practise';
import { AddPractise, DeletePractise } from '../actions/practise.action';
import { HttpClient } from '@angular/common/http';

export interface PractiseStateModel {
    practises: Practise[];
}

@State<PractiseStateModel>({
    name: 'practises',
    defaults: {
        practises: []
    }
})
export class PractiseState {

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    @Selector()
    static getPractises(state: PractiseStateModel) {
        return state.practises;
    }

    @Action(AddPractise)
    add({getState, patchState }: StateContext<PractiseStateModel>, action : AddPractise) {
        const state = getState();
        action.payload.id = this.generateUUID();
        // http.POST(payload);
        patchState({
            practises: [...state.practises, action.payload]
        });
    }

    @Action(DeletePractise)
    deleteUser({getState, setState}: StateContext<PractiseStateModel>, {id}: DeletePractise) {        
        const state = getState();
        const filteredArray = state.practises.filter(item => item.id !== id);
        // http.DELETE(id)
        setState({
            ...state,
            practises: filteredArray,
        });
    }

    /*
    @Action(UpdateUser)
    updateUser({getState, setState}: StateContext<UserStateModel>, {id}: DeleteUser) {        
        const state = getState();
        const filteredArray = state.users.filter(item => item.id !== id);
        // http.DELETE(id)
        setState({
            ...state,
            users: filteredArray,
        });
    }
    */


}