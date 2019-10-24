import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Practise } from '../models/Practise';
import { AddPractise, DeletePractise, InitPractises, UpdatePractise, LogIn, LogOut } from '../actions/practise.action';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface PractiseStateModel {
    practises: Practise[];
    access_token: string;
}

@State<PractiseStateModel>({
    name: 'practises',
    defaults: {
        practises: [],
        access_token: null
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
                let newPractises = [...state.practises, practise];
                newPractises.sort(function(a: Practise, b: Practise){
                    if(a.date > b.date) {
                        return -1;
                    }
                    if(a.date < b.date) {
                        return 1;
                    }
                    return 0;
                });
                patchState({
                    practises: [ ...newPractises ]
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
    deletePractise({getState, patchState}: StateContext<PractiseStateModel>, {id}: DeletePractise) {
        return this.http.delete('http://localhost:3000/practises/'+id, {responseType: 'json'})
            .pipe(
                tap((info: any) => {
                    if(info.id === undefined) {                    
                        console.error("got from REST", info);
                        throw new Error("no ID returned");
                    }
                    const state = getState();
                    const filteredArray = state.practises.filter(item => item.id !== id); 
                    patchState({
                        practises: [ ...filteredArray ]
                    });                  
                }),
                catchError(err => err.code === 404 
                    ? throwError("Not found")
                    : throwError(err))
                );
    }

    
    @Action(UpdatePractise)
    updatePractise({getState, patchState}: StateContext<PractiseStateModel>, action: UpdatePractise) {
        console.log(action);
        const practise = action.payload;
        const id = practise.id;
        return this.http.put('http://localhost:3000/practises/'+id, practise).pipe(
            tap((info: any) => {                
                if(info.id === undefined) {                    
                    console.error("got from REST", info);
                    throw new Error("no ID returned");
                }
                const state = getState();
                state.practises.forEach((item) => { 
                    if (item.id === id) {
                        item = practise;
                    }                  
                    });
                patchState({
                    practises: [ ...state.practises ]
                  });
            
            }),
            catchError(err => err.code === 404 
                ? throwError("Not found")
                : throwError(err))
            );
    }

    @Action(LogIn)
    logIn({patchState}: StateContext<PractiseStateModel>, action: any) {
        patchState({
            access_token:  action.payload
            });   
    }

    @Action(LogOut)
    logOut({patchState}: StateContext<PractiseStateModel>) {
        patchState({
            access_token: null
            });   
    }
        /*       
        const state = getState();
        const filteredArray = state.practises.filter(item => item.id !== id);
        // http.DELETE(id)
        setState({
            ...state,
            users: filteredArray,
        });
        */

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