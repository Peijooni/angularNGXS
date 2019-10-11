import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Practise } from '../models/Practise';
import { AddPractise, DeletePractise, InitPractises, UpdatePractise } from '../actions/practise.action';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient){}

    @Selector()
    static getPractises(state: PractiseStateModel) {
        return state.practises;
    }

    @Action(AddPractise)
    add({getState, patchState}: StateContext<PractiseStateModel>, action: AddPractise) {
        let practise = action.payload;
        return this.http.post('http://localhost:3000/practises', practise).pipe(
            tap((info: any) => {                
                if(info.id === undefined) {                    
                    console.error("got from REST", info);
                    throw new Error("no ID returned");
                }
                practise.id = info.id;
                const state = getState();
                patchState({
                    practises: [ ...state.practises, practise ]
                  });
            
            }),
            catchError(err => err.code === 404 
                ? throwError("Not found")
                : throwError(err))
            );
    }

    @Action(InitPractises)
    initializeStoreFromREST({patchState}: StateContext<PractiseStateModel>) {
        return this.http.get('http://localhost:3000/practises', {responseType: 'json'}).pipe(
            tap((info: any) => {        
                patchState({
                    practises: [ ...info ]
                  });                  
            }),
            catchError(err => err.code === 404 
                ? throwError("Not found")
                : throwError(err))
            );
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

    
    @Action(UpdatePractise)
    updateUser({getState, setState}: StateContext<PractiseStateModel>, action: UpdatePractise) {
        console.log(action);
        /*       
        const state = getState();
        const filteredArray = state.practises.filter(item => item.id !== id);
        // http.DELETE(id)
        setState({
            ...state,
            users: filteredArray,
        });
        */
    }

    /*
        @Action(UpdatePractise)
    updateUser({getState, setState}: StateContext<PractiseStateModel>, action: UpdatePractise) {        
        const state = getState();
        const filteredArray = state.practises.filter(item => item.id !== id);
        // http.DELETE(id)
        setState({
            ...state,
            users: filteredArray,
        });
    }
    */
    


}